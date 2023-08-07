package com.coala.backend.techpost.api.service;

import com.coala.backend.freepost.db.dto.response.BaseResponseDto;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.techpost.db.entity.TechPost;
import com.coala.backend.techpost.db.repository.TechCommentRepository;
import com.coala.backend.techpost.db.repository.TechGoodRepository;
import com.coala.backend.techpost.db.repository.TechPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
 자유게시판 기능 구현 Impl 입니다.

* */

@Service
@RequiredArgsConstructor
public class TechPostServiceImpl implements TechPostService{
    private final TechPostRepository techPostRepository;
    private final TechGoodRepository techGoodRepository;

    @Transactional
    @Override
    public Member savePost(TechPostRequestDto postDto, Member member) {

        techPostRepository.saveAndFlush(postDto.toEntity(member));

        return member;
    }

    @Transactional
    @Override
    public BaseResponseDto getPostList(int page) {
        Pageable pageable = PageRequest.of(page,8, Sort.by("createAt").descending().and(Sort.by("updateAt")));

        List <TechPostResponseDto> allList = techPostRepository.findAll(pageable).stream()
                .map(techPost -> TechPostResponseDto.builder()
                        .memberId(techPost.getMemberId())
                        .title(techPost.getTitle())
                        .detail(techPost.getDetail())
                        .createAt(techPost.getCreateAt())
                        .updateAt(techPost.getUpdateAt())
                        .imagePath(techPost.getImagePath())
                        .nickname(techPost.getNickname())
                        .views(techPost.getViews())
                        .commentCount(techPost.getComments().size())
                        .goodCount(techPost.getGoods().size())
                        .build())
                .collect(Collectors.toList());

        return BaseResponseDto.builder()
                .statusCode(200)
                .msg("성공")
                .detail(allList.size())
                .list(allList)
                .build();
    }

    @Transactional
    @Override
    public TechPostResponseDto getPost(Long id) {
        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("없는 게시글 입니다.");
        });

        techPost.views();

        return TechPostResponseDto.builder()
                .id(techPost.getId())
                .memberId(techPost.getMemberId())
                .title(techPost.getTitle())
                .detail(techPost.getDetail())
                .createAt(techPost.getCreateAt())
                .updateAt(techPost.getUpdateAt())
                .imagePath(techPost.getImagePath())
                .nickname(techPost.getNickname())
                .views(techPost.getViews())
                .commentCount(techPost.getComments().size())
                .goodCount(techPost.getGoods().size())
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id, TechPostRequestDto dto, Member member) {
        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시판이 존재하지 않습니다.");
        });

        if (!techPost.getMemberId().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }

        techGoodRepository.deleteByTpId(techPost);
        techPostRepository.deleteById(id);
    }

    @Transactional
    @Override
    public BaseResponseDto searchPosts(String keyword, int page) {
        Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
        List<TechPostResponseDto> searchList = techPostRepository.findByTitleContaining(keyword, pageable).stream()
                .map(techPost -> TechPostResponseDto.builder()
                        .memberId(techPost.getMemberId())
                        .title(techPost.getTitle())
                        .detail(techPost.getDetail())
                        .createAt(techPost.getCreateAt())
                        .updateAt(techPost.getUpdateAt())
                        .imagePath(techPost.getImagePath())
                        .nickname(techPost.getNickname())
                        .views(techPost.getViews())
                        .commentCount(techPost.getComments().size())
                        .goodCount((techPost.getGoods().size()))
                        .build())
                .collect(Collectors.toList());

        return BaseResponseDto.builder()
                .statusCode(200)
                .msg("성공")
                .detail(searchList.size())
                .list(searchList)
                .build();
    }

    @Transactional
    @Override
    public void updateTechPost(Long id, TechPostRequestDto dto, Member member) {
        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return  new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (!techPost.getMemberId().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }

        techPost.updateTechPost(
                dto.getTitle(),
                dto.getDetail(),
                dto.getImagePath(),
                dto.getNickname());
    }
}
