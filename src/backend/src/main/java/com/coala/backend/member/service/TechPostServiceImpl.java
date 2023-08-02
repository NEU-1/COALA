package com.coala.backend.api.service;

import com.coala.backend.db.dto.request.TechPostRequestDto;
import com.coala.backend.db.entity.TechPost;
import com.coala.backend.db.repository.TechPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
public class TechPostServiceImpl implements TechPostService{
    private final TechPostRepository techPostRepository;

    @Autowired
    public TechPostServiceImpl(TechPostRepository techPostRepository) {
        this.techPostRepository = techPostRepository;
    }

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
                        .userId(techPost.getUserId())
                        .title(techPost.getTitle())
                        .detail(techPost.getDetail())
                        .createAt(techPost.getCreateAt())
                        .updateAt(techPost.getUpdateAt())
                        .imagePath(techPost.getImagePath())
                        .nickname(techPost.getNickname())
                        .views(techPost.getViews())
                        .count(techPost.getCount())
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
                .userId(tech.getUserId())
                .title(tech.getTitle())
                .detail(tech.getDetail())
                .createAt(tech.getCreateAt())
                .updateAt(tech.getUpdateAt())
                .imagePath(tech.getImagePath())
                .nickname(tech.getNickname())
                .views(tech.getViews())
                .count(tech.getCount())
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id) {
        techPostRepository.deleteById(id);
    }

    @Transactional
    @Override
    public List<TechPostRequestDto> searchPosts(String keyword, int page) {
        Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
        return techPostRepository.findByTitleContaining(keyword, pageable).stream()
                .map(techPost -> TechPostRequestDto.builder()
                        .id(techPost.getId())
                        .userId(techPost.getUserId())
                        .title(techPost.getTitle())
                        .detail(techPost.getDetail())
                        .createAt(techPost.getCreateAt())
                        .updateAt(techPost.getUpdateAt())
                        .imagePath(techPost.getImagePath())
                        .nickname(techPost.getNickname())
                        .views(techPost.getViews())
                        .count(techPost.getCount())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void updateTechPost(Long id, TechPostRequestDto dto) {
        Optional<TechPost> byId = techPostRepository.findById(id);
        TechPost techPost = byId.get();

        techPost.updateTechPost(dto.getUserId(), dto.getTitle(), dto.getDetail()
                , dto.getImagePath(), dto.getNickname());
    }
}
