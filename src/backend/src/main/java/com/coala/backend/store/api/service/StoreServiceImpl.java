package com.coala.backend.store.api.service;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.product.db.entity.Category;
import com.coala.backend.product.db.repository.CategoryRepository;
import com.coala.backend.store.db.dto.response.PostResponseDto;
import com.coala.backend.store.db.entity.StoreLike;
import com.coala.backend.store.db.entity.StorePost;
import com.coala.backend.store.db.repository.CustomStorePostRepository;
import com.coala.backend.store.db.repository.StoreLikeRepository;
import com.coala.backend.store.db.repository.StorePostRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class StoreServiceImpl implements StoreService {

    private StorePostRepository storePostRepository;
    private StoreLikeRepository storeLikeRepository;
    private MemberRepository memberRepository;

    private CustomStorePostRepository customStorePostRepository;

    private CategoryRepository categoryRepository;

    public StoreServiceImpl(StorePostRepository storePostRepository, StoreLikeRepository storeLikeRepository, MemberRepository memberRepository, CustomStorePostRepository customStorePostRepository, CategoryRepository categoryRepository) {
        this.storePostRepository = storePostRepository;
        this.storeLikeRepository = storeLikeRepository;
        this.memberRepository = memberRepository;
        this.customStorePostRepository = customStorePostRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<StorePost> list(Integer page, Map<String, String> info) {
        return customStorePostRepository.findAllFilter(info, page);
    }

    @Override
    public BaseResponseDto write(Map<String, String> info, Member member) {
        StorePost storePost = new StorePost();

        storePost.setTitle(info.get("title"));
        storePost.setDetail(info.get("detail"));
        storePost.setMinRentalPeriod(Integer.parseInt(info.get("minRentalPeriod")));
        storePost.setMaxRentalPeriod(Integer.parseInt(info.get("maxRentalPeriod")));
        storePost.setLimitDate(Date.valueOf(info.get("limitDate")));
        storePost.setRentalCost(Integer.parseInt(info.get("rentalCost")));
        storePost.setDeposit(Integer.parseInt(info.get("deposit")));
        storePost.setAuthor(member.getName());
        storePost.setMember(member);

        Category category = categoryRepository.findById(Long.parseLong(info.get("category")))
                        .orElseThrow(() -> new NoSuchElementException("제품분류가 없습니다."));

        storePost.setCategory(category);

        storePostRepository.save(storePost);

        return new BaseResponseDto("게시글이 성공적으로 저장되었습니다.", 200);
    }

    @Override
    public void views(Long id) {
        StorePost storePost = storePostRepository.findById(id).get();
        storePost.setViews(storePost.getViews()+1);
        storePostRepository.save(storePost);
    }

    @Override
    public PostResponseDto detail(Long id) {
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));
        Integer likes = storeLikeRepository.findByStorePost(storePost).size();
        PostResponseDto postResponseDto = new PostResponseDto();
        postResponseDto.setLike(likes);
        postResponseDto.setStorePost(storePost);
        postResponseDto.setCategory(storePost.getCategory());
        postResponseDto.setBaseResponseDto(new BaseResponseDto( "성공적으로 정보를 불러왔습니다.", 200));

        return postResponseDto;
    }

    @Override
    public BaseResponseDto update(Long id, Map<String, String> info, String email){
        // 수정 페이지 넘어가는 유효성 검사는 프론트단에서
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        if(filter(storePost.getMember().getEmail(), email)){
            storePost.setTitle(info.get("title"));
            storePost.setDetail(info.get("detail"));
            storePost.setMinRentalPeriod(Integer.parseInt(info.get("minRentalPeriod")));
            storePost.setMaxRentalPeriod(Integer.parseInt(info.get("maxRentalPeriod")));
            storePost.setLimitDate(Date.valueOf(info.get("limitDate")));
            storePost.setRentalCost(Integer.parseInt(info.get("rentalCost")));
            storePost.setDeposit(Integer.parseInt(info.get("deposit")));
            storePost.setUpdatedAt(LocalDateTime.now());
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


    public static boolean filter(String postEmail, String email){
        if(email.equals(postEmail)){
            return true;
        }
        return false;
    }
}
