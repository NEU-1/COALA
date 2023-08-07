package com.coala.backend.techpost.api.service;

import com.coala.backend.techpost.db.dto.request.TechPostRequestDto;
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
    public void savePost(TechPostRequestDto postDto) {
        techPostRepository.save(postDto.toEntity());
    }

    @Transactional
    @Override
    public List<TechPostRequestDto> getPostList(int page) {
        Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
        return techPostRepository.findAll(pageable).stream()
                .map(techPost -> TechPostRequestDto.builder()
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
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public TechPostRequestDto getPost(Long id) {
        Optional<TechPost> techPost = techPostRepository.findById(id);
        TechPost tech = techPost.get();

        tech.views();

        return TechPostRequestDto.builder()
                .id(tech.getId())
                .memberId(tech.getMemberId())
                .title(tech.getTitle())
                .detail(tech.getDetail())
                .createAt(tech.getCreateAt())
                .updateAt(tech.getUpdateAt())
                .imagePath(tech.getImagePath())
                .nickname(tech.getNickname())
                .views(tech.getViews())
                .commentCount(tech.getComments().size())
                .goodCount(tech.getGoods().size())
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id, TechPostRequestDto dto) {
        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시판이 존재하지 않습니다.");
        });

        if (!techPost.getMemberId().getEmail().equals(dto.getMemberId().getEmail())) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }

        techGoodRepository.deleteByTpId(techPost);
        techPostRepository.deleteById(id);
    }

    @Transactional
    @Override
    public List<TechPostRequestDto> searchPosts(String keyword, int page) {
        Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
        return techPostRepository.findByTitleContaining(keyword, pageable).stream()
                .map(techPost -> TechPostRequestDto.builder()
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
                        .goodCount((techPost.getGoods().size()))
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void updateTechPost(Long id, TechPostRequestDto dto) {
        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return  new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (!techPost.getMemberId().getEmail().equals(dto.getMemberId().getEmail())) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }

        techPost.updateTechPost(
                dto.getTitle(),
                dto.getDetail(),
                dto.getImagePath(),
                dto.getNickname());
    }
}
