package com.coala.backend.community.freepost.api.service;

import com.coala.backend.community.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.repository.FreeGoodRepository;
import com.coala.backend.community.freepost.db.repository.FreePostRepository;
import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.freepost.db.dto.response.FreePostResponseDto;
import com.coala.backend.member.db.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/*
 자유게시판 기능 구현 Impl 입니다.

* */

@Service
@RequiredArgsConstructor
public class FreePostServiceImpl implements FreePostService{
    private final FreePostRepository freePostRepository;
    private final FreeGoodRepository freeGoodRepository;

    @Transactional
    @Override
    public Member savePost(FreePostRequestDto postDto, Member member) {

        freePostRepository.saveAndFlush(postDto.toEntity(member));

        System.out.println(member.getEmail());
        System.out.println(member.getNickname());
        return member;
    }

    @Transactional
    @Override
    public BasePostResponseDto getPostList(int page) {
        Pageable pageable = PageRequest.of(page,8, Sort.by("createAt").descending().and(Sort.by("updateAt")));

        List<FreePostResponseDto> allList = freePostRepository.findAll(pageable).stream()
                .map(freePost -> FreePostResponseDto.builder()
                        .memberId(freePost.getMemberId())
                        .title(freePost.getTitle())
                        .detail(freePost.getDetail())
                        .createAt(freePost.getCreateAt())
                        .updateAt(freePost.getUpdateAt())
                        .imagePath(freePost.getImagePath())
                        .isAnonymous(freePost.isAnonymous())
                        .views(freePost.getViews())
                        .commentCount(freePost.getComments().size())
                        .goodCount(freePost.getGoods().size())
                        .build())
                .collect(Collectors.toList());

        return BasePostResponseDto.builder()
                .statusCode(200)
                .msg("성공")
                .detail(allList.size())
                .list(allList)
                .build();
    }

    @Transactional
    @Override
    public FreePostResponseDto getPost(Long id) {
        FreePost freePost = freePostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("없는 게시글 입니다.");
        });

        freePost.views();

        return FreePostResponseDto.builder()
                .memberId(freePost.getMemberId())
                .title(freePost.getTitle())
                .detail(freePost.getDetail())
                .createAt(freePost.getCreateAt())
                .updateAt(freePost.getUpdateAt())
                .imagePath(freePost.getImagePath())
                .isAnonymous(freePost.isAnonymous())
                .views(freePost.getViews())
                .commentCount(freePost.getComments().size())
                .goodCount(freePost.getGoods().size())
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id, Member member) {
        FreePost freePost = freePostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시판이 존재하지 않습니다.");
        });

        if (!freePost.getMemberId().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }

        freeGoodRepository.deleteByFpId(freePost);
        freePostRepository.deleteById(id);
    }

    @Transactional
    @Override
    public BasePostResponseDto searchPosts(String keyword, int page) {
        Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
        List<FreePostResponseDto> searchList = freePostRepository.findByTitleContaining(keyword, pageable).stream()
                .map(freePost -> FreePostResponseDto.builder()
                        .memberId(freePost.getMemberId())
                        .title(freePost.getTitle())
                        .detail(freePost.getDetail())
                        .createAt(freePost.getCreateAt())
                        .updateAt(freePost.getUpdateAt())
                        .imagePath(freePost.getImagePath())
                        .isAnonymous(freePost.isAnonymous())
                        .views(freePost.getViews())
                        .commentCount(freePost.getComments().size())
                        .goodCount(freePost.getGoods().size())
                        .build())
                .collect(Collectors.toList());

        return BasePostResponseDto.builder()
                .statusCode(200)
                .msg("성공")
                .detail(searchList.size())
                .list(searchList)
                .build();
    }

    @Transactional
    @Override
    public void updateFreePost(Long id, FreePostRequestDto dto, Member member) {
        FreePost freePost = freePostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (!freePost.getMemberId().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }

        freePost.updateFreePost(
                dto.getTitle(),
                dto.getDetail(),
                dto.getImagePath(),
                dto.isAnonymous());

        freePostRepository.save(freePost);
    }
}
