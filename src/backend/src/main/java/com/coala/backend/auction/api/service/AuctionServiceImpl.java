package com.coala.backend.auction.api.service;

import com.coala.backend.auction.db.dto.response.ApplyResponseDto;
import com.coala.backend.auction.db.dto.response.PostResponseDto;
import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.auction.db.entity.AuctionPost;
import com.coala.backend.auction.db.repository.AuctionApplyRepository;
import com.coala.backend.auction.db.repository.AuctionPostRepository;
import com.coala.backend.auction.db.repository.CustomAuctionPostRepositoryImpl;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.product.db.entity.Category;
import com.coala.backend.product.db.repository.CategoryRepository;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AuctionServiceImpl implements AuctionService{

    private AuctionPostRepository auctionPostRepository;

    private MemberRepository memberRepository;

    private CategoryRepository categoryRepository;

    private CustomAuctionPostRepositoryImpl customAuctionPostRepository;

    private AuctionApplyRepository auctionApplyRepository;


    public AuctionServiceImpl(AuctionPostRepository auctionPostRepository, MemberRepository memberRepository, CategoryRepository categoryRepository, CustomAuctionPostRepositoryImpl customAuctionPostRepository, AuctionApplyRepository auctionApplyRepository) {
        this.auctionPostRepository = auctionPostRepository;
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
        this.customAuctionPostRepository = customAuctionPostRepository;
        this.auctionApplyRepository = auctionApplyRepository;
    }

    @Override
    public ListResponseDto list(Integer page, Map<String, String> info) {
        ListResponseDto listResponseDto = new ListResponseDto();

        List<AuctionPost> list = customAuctionPostRepository.findAllFilter(info, page);
        listResponseDto.setList(list);
        listResponseDto.setSize(auctionPostRepository.findAll().size());

        return listResponseDto;
    }

    @Override
    public BaseResponseDto write(Map<String, String> info, Member member) {
        AuctionPost auctionPost = new AuctionPost();

        auctionPost.setTitle(info.get("title"));
        auctionPost.setDetail(info.get("detail"));
        auctionPost.setMinRentalPeriod(Integer.parseInt(info.get("minRentalPeriod")));
        auctionPost.setAuthor(member.getName());
        auctionPost.setMember(member);

        Category category = categoryRepository.findById(Long.parseLong(info.get("category")))
                .orElseThrow(() -> new NoSuchElementException("제품분류가 없습니다."));

        auctionPost.setCategory(category);

        auctionPostRepository.save(auctionPost);

        return new BaseResponseDto("게시글이 성공적으로 저장되었습니다.", 200);
    }

    @Override
    public void views(Long id) {
        AuctionPost auctionPost = auctionPostRepository.findById(id).get();
        auctionPost.setViews(auctionPost.getViews()+1);
        auctionPostRepository.save(auctionPost);
    }

    @Override
    public PostResponseDto detail(Long id, String email) {
        AuctionPost auctionPost = auctionPostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        PostResponseDto postResponseDto = new PostResponseDto();
        postResponseDto.setAuctionPost(auctionPost);

        if(auctionPost.getMember().getEmail().equals(email)){
            postResponseDto.setMine(true);
        }
        else{
            postResponseDto.setMine(false);
        }

        List<AuctionApply> auctionApplies = auctionApplyRepository.findByAuctionPost(auctionPost);

        List<ApplyResponseDto> applyResponseDtoList = new ArrayList<>();

        for(AuctionApply apply : auctionApplies){
            applyResponseDtoList.add(new ApplyResponseDto(apply, apply.getMember().getId()));
        }

        postResponseDto.setAuctionApplies(applyResponseDtoList);
        postResponseDto.setCategory(auctionPost.getCategory());
        postResponseDto.setBaseResponseDto(new BaseResponseDto( "성공적으로 정보를 불러왔습니다.", 200));

        return postResponseDto;
    }

    @Override
    public BaseResponseDto update(Long id, Map<String, String> info, String email) {
        AuctionPost auctionPost = auctionPostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        Member member = auctionPost.getMember();

        if(filter(member.getEmail(), email)){
            auctionPost.setTitle(info.get("title"));
            auctionPost.setDetail(info.get("detail"));
            auctionPost.setMinRentalPeriod(Integer.parseInt(info.get("minRentalPeriod")));
            Category category = categoryRepository.findById(Long.parseLong(info.get("category")))
                    .orElseThrow(() -> new NoSuchElementException("카테고리가 입력되지 않았습니다."));
            auctionPost.setCategory(category);
            auctionPost.setUpdatedAt(LocalDateTime.now());
            auctionPostRepository.save(auctionPost);
            return new BaseResponseDto("게시글이 정상적으로 수정되었습니다.", 200);
        }

        return new BaseResponseDto("게시글 작성자가 아닙니다.", 403);
    }

    @Override
    public BaseResponseDto delete(Long id, String email) {
        AuctionPost auctionPost = auctionPostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        Member member = auctionPost.getMember();
        if(filter(member.getEmail(), email)){
            auctionPostRepository.delete(auctionPostRepository.findById(id).get());

            return new BaseResponseDto("삭제가 완료되었습니다.", 200);
        }
        return new BaseResponseDto("게시글 작성자가 아닙니다.", 403);
    }

    @Override
    public BaseResponseDto apply(Long id, Map<String, String> info, String email) {
        AuctionPost auctionPost = auctionPostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        if(auctionPost.getMember().getEmail().equals(email)){
            return new BaseResponseDto("본인의 게시물에는 제안할 수 없습니다.", 403);
        }

        if(auctionPost.getStatus() != 1){
            return new BaseResponseDto("현재 거래가 진행되어 신청이 불가능합니다.", 403);
        }

        // 제안자
        Member applier = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("신청자가 존재하지 않습니다."));

        AuctionApply auctionApply = new AuctionApply();

        auctionApply.setAuctionPost(auctionPost);

        auctionApply.setMember(applier);

        auctionApply.setTitle(info.get("title"));
        auctionApply.setDetail(info.get("detail"));
        auctionApply.setDeposit(Integer.parseInt(info.get("deposit")));
        auctionApply.setRentalCost(Integer.parseInt(info.get("rentalCost")));
        auctionApply.setNegotiation(Integer.parseInt(info.get("negotiation")));

        auctionApplyRepository.save(auctionApply);

        return new BaseResponseDto("신청이 완료되었습니다.", 200);
    }

    @Override
    public BaseResponseDto status(Long id, String email) {
        AuctionPost auctionPost = auctionPostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글을 찾을 수 없습니다."));

        Member member = auctionPost.getMember();
        // 권한
        if(!member.getEmail().equals(email)){
            return new BaseResponseDto("권한이 없습니다.", 403);
        }

        // 대기중 => 예약중
        if(auctionPost.getStatus() == 1){
            auctionPost.setStatus(0);
            auctionPostRepository.save(auctionPost);
            return new BaseResponseDto("예약이 완료되었습니다.", 200);
        }

        // 예약중 => 거래완료
        if(auctionPost.getStatus() == 0){
            auctionPost.setStatus(-1);
            auctionPostRepository.save(auctionPost);
            return new BaseResponseDto("거래가 완료되었습니다.", 200);
        }

        // 프론트 단에서 차단해주는것 권장
        if(auctionPost.getStatus() == -1){
            return new BaseResponseDto("이미 완료된 거래입니다.", 200);
        }

        return new BaseResponseDto("상태 변경에 실패했습니다.", 400);
    }

    @Override
    public PostResponseDto valid(Long id, String email) {
            AuctionPost auctionPost = auctionPostRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

            PostResponseDto postResponseDto = new PostResponseDto();

            if(!auctionPost.getMember().getEmail().equals(email)){
                postResponseDto.setBaseResponseDto(new BaseResponseDto("작성자가 아닙니다.", 403));
                return postResponseDto;
            }

            List<AuctionApply> auctionApplies = auctionApplyRepository.findByAuctionPost(auctionPost);

            List<ApplyResponseDto> applyResponseDtoList = new ArrayList<>();

            for(AuctionApply apply : auctionApplies){
                applyResponseDtoList.add(new ApplyResponseDto(apply, apply.getMember().getId()));
            }

            postResponseDto.setAuctionApplies(applyResponseDtoList);

            postResponseDto.setAuctionPost(auctionPost);
            postResponseDto.setCategory(auctionPost.getCategory());
            postResponseDto.setBaseResponseDto(new BaseResponseDto( "성공적으로 정보를 불러왔습니다. 게시글을 수정해 주세요.", 200));
            return postResponseDto;
    }

    public static boolean filter(String postEmail, String email){
        if(email.equals(postEmail)){
            return true;
        }
        return false;
    }
}
