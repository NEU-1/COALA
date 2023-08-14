package com.coala.backend.store.api.service;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.product.db.entity.Category;
import com.coala.backend.product.db.repository.CategoryRepository;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import com.coala.backend.store.db.dto.response.PostResponseDto;
import com.coala.backend.store.db.dto.response.StoreListDto;
import com.coala.backend.store.db.dto.response.StorePostResponseDto;
import com.coala.backend.store.db.entity.StoreLike;
import com.coala.backend.store.db.entity.StorePost;
import com.coala.backend.store.db.repository.CustomStorePostRepository;
import com.coala.backend.store.db.repository.StoreImageRepository;
import com.coala.backend.store.db.repository.StoreLikeRepository;
import com.coala.backend.store.db.repository.StorePostRepository;
import lombok.AllArgsConstructor;
import org.apache.catalina.Store;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class StoreServiceImpl implements StoreService {

    private StorePostRepository storePostRepository;
    private StoreImageRepository storeImageRepository;
    private StoreLikeRepository storeLikeRepository;
    private MemberRepository memberRepository;
    private CustomStorePostRepository customStorePostRepository;
    private CategoryRepository categoryRepository;

    @Override
    public ListResponseDto list(Integer page, Map<String, String> info, String email) {
        // 리스트 정보 조회
        List<StorePost> list = customStorePostRepository.findAllFilter(info, page);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("유저정보가 일치하지 않습니다."));

        // member ID
        Long memberId = member.getId();

        // 결과 리스트
        List<StoreListDto> result = new ArrayList<>();

        // 좋아요 정보 확인
        for(StorePost store : list){
            StoreListDto SLD = new StoreListDto();

            // 게시글 정보
            SLD.setStorePost(store);
            SLD.setLike(false);

            if(store.getMember().getId() == memberId){
                SLD.setMine(true);
            }

            // 게시글 별로 좋아요 확인
            List<StoreLike> likes = storeLikeRepository.findByStorePost(store);

            for(StoreLike like : likes){
                if(like.getMember().getId() == memberId){
                    SLD.setLike(true);
                    break;
                }
            }
            SLD.setStoreImageList(storeImageRepository.findByStorePost(store));

            result.add(SLD);
        }

        ListResponseDto listResponseDto = new ListResponseDto();

        listResponseDto.setList(result);

        Integer size = storePostRepository.findAll().size();
        listResponseDto.setSize(size);

        return listResponseDto;
    }

    @Override
    public StorePostResponseDto write(StorePost storePost, Member member) {
        storePost.setTitle(storePost.getTitle());
        storePost.setDetail(storePost.getDetail());
        storePost.setMinRentalPeriod(storePost.getMinRentalPeriod());
        storePost.setMaxRentalPeriod(storePost.getMaxRentalPeriod());
        storePost.setLimitDate(storePost.getLimitDate());
        storePost.setRentalCost(storePost.getRentalCost());
        storePost.setDeposit(storePost.getDeposit());
        storePost.setAuthor(member.getName());
        storePost.setMember(member);

        Category category = categoryRepository.findById(storePost.getCategory().getId())
                        .orElseThrow(() -> new NoSuchElementException("제품분류가 없습니다."));

        storePost.setCategory(category);

        storePostRepository.save(storePost);

        List<StorePost> list = storePostRepository.findAll();

        StorePost post = list.get(list.size()-1);

        StorePostResponseDto storePostResponseDto = new StorePostResponseDto();

        storePostResponseDto.setBaseResponseDto(new BaseResponseDto("게시글이 성공적으로 저장되었습니다.", 200));
        storePostResponseDto.setStorePost(post);

        return storePostResponseDto;
    }

    @Override
    public void views(Long id) {
        StorePost storePost = storePostRepository.findById(id).get();
        storePost.setViews(storePost.getViews()+1);
        storePostRepository.save(storePost);
    }

    @Override
    public PostResponseDto detail(Long id, String email) {
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));


        List<StoreLike> likes = storeLikeRepository.findByStorePost(storePost);
        PostResponseDto postResponseDto = new PostResponseDto();
        postResponseDto.setLikes(likes.size());
        postResponseDto.setStorePost(storePost);
        postResponseDto.setMemberId(storePost.getMember().getId());
        postResponseDto.setLike(false);

        for(StoreLike like : likes){
            if(like.getMember().getEmail().equals(email)){
                postResponseDto.setLike(true);
            }
        }

        if(storePost.getMember().getEmail().equals(email)){
            postResponseDto.setMine(true);
        }else{
            postResponseDto.setMine(false);
        }

        postResponseDto.setBaseResponseDto(new BaseResponseDto( "성공적으로 정보를 불러왔습니다.", 200));
        postResponseDto.setStoreImageList(storeImageRepository.findByStorePost(storePost));
        return postResponseDto;
    }

    @Override
    public BaseResponseDto update(Long id, StorePost post, String email){


        // 수정 페이지 넘어가는 유효성 검사는 프론트단에서
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        if(filter(storePost.getMember().getEmail(), email)){
            storePost.setTitle(post.getTitle());
            storePost.setDetail(post.getDetail());
            storePost.setMinRentalPeriod(post.getMinRentalPeriod());
            storePost.setMaxRentalPeriod(post.getMaxRentalPeriod());
            storePost.setLimitDate(post.getLimitDate());
            storePost.setRentalCost(post.getRentalCost());
            storePost.setDeposit(post.getDeposit());
            storePost.setUpdatedAt(LocalDateTime.now());

            Category category = categoryRepository.findById(post.getCategory().getId())
                    .orElseThrow(() -> new NoSuchElementException("제품분류가 없습니다."));

            storePost.setCategory(category);


            storePostRepository.save(storePost);
            return new BaseResponseDto("게시글이 정상적으로 수정되었습니다.", 200);

        }
        return new BaseResponseDto("게시글 작성자가 아닙니다.", 403);
    }

    @Override
    public BaseResponseDto delete(Long id, String email) {
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));


        if(filter(storePost.getMember().getEmail(), email)){
            storePostRepository.delete(storePostRepository.findById(id).get());

            return new BaseResponseDto("삭제가 완료되었습니다.", 200);
        }
        return new BaseResponseDto("게시글 작성자가 아닙니다.", 403);
    }

    @Override
    public BaseResponseDto like(Long id, String email) {
        // 사용자 이메일 email
        StoreLike storeLike = new StoreLike();
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("회원이 존재하지 않습니다."));
        if(storePost.getMember().getEmail().equals(email)){
            return new BaseResponseDto("작성자는 추천할 수 없습니다.", 403);
        }
        Optional<StoreLike> temp = storeLikeRepository.findByMemberAndStorePost(member, storePost);
        if(temp.isPresent()){
            storeLikeRepository.deleteById(temp.get().getId());
            return new BaseResponseDto("좋아요를 취소하였습니다.", 200);
        }else{

            storeLike.setStorePost(storePost);
            storeLike.setMember(member);

            storeLikeRepository.save(storeLike);
            return new BaseResponseDto("좋아요가 완료되었습니다.",200);
        }
    }

    @Override
    public BaseResponseDto status(Long id, String email) {
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글을 찾을 수 없습니다."));

        // 권한
        if(!storePost.getMember().getEmail().equals(email)){
            return new BaseResponseDto("권한이 없습니다.", 403);
        }

        // 대기중 => 예약중
        if(storePost.getStatus() == 1){
            storePost.setStatus(0);
            storePostRepository.save(storePost);
            return new BaseResponseDto("예약이 완료되었습니다.", 200);
        }

        // 예약중 => 거래완료
        if(storePost.getStatus() == 0){
            storePost.setStatus(-1);
            storePostRepository.save(storePost);
            return new BaseResponseDto("거래가 완료되었습니다.", 200);
        }

        // 프론트 단에서 차단해주는것 권장
        if(storePost.getStatus() == -1){
            return new BaseResponseDto("이미 완료된 거래입니다.", 200);
        }

        return new BaseResponseDto("상태 변경에 실패했습니다.", 400);
    }

    @Override
    public PostResponseDto valid(Long id, String email) {
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        PostResponseDto postResponseDto = new PostResponseDto();

        if(!storePost.getMember().getEmail().equals(email)){
            postResponseDto.setBaseResponseDto(new BaseResponseDto("작성자가 아닙니다.", 403));
            return postResponseDto;
        }

        List<StoreLike> likes = storeLikeRepository.findByStorePost(storePost);
        postResponseDto.setLikes(likes.size());
        postResponseDto.setStorePost(storePost);
        postResponseDto.setLike(false);

        for(StoreLike like : likes){
            if(like.getMember().getEmail().equals(email)){
                postResponseDto.setLike(true);
            }
        }

        if(storePost.getMember().getEmail().equals(email)){
            postResponseDto.setMine(true);
        }else{
            postResponseDto.setMine(false);
        }
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
