package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.freepost.db.repository.FreePostRepository;
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
public class FreePostServiceImpl implements FreePostService{
    private final FreePostRepository freePostRepository;

    @Transactional
    @Override
    public void savePost(FreePostRequestDto postDto) {

        freePostRepository.save(postDto.toEntity());
    }

    @Transactional
    @Override
    public List<FreePostRequestDto> getPostList(int page) {
        Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
        return freePostRepository.findAll(pageable).stream()
                .map(freePost -> FreePostRequestDto.builder()
                        .id(freePost.getId())
                        .memberId(freePost.getMemberId())
                        .title(freePost.getTitle())
                        .detail(freePost.getDetail())
                        .createAt(freePost.getCreateAt())
                        .updateAt(freePost.getUpdateAt())
                        .imagePath(freePost.getImagePath())
                        .isAnonymous(freePost.isAnonymous())
                        .views(freePost.getViews())
                        .count(freePost.getCount())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public FreePostRequestDto getPost(Long id) {
        Optional<FreePost> freePost = freePostRepository.findById(id);
        FreePost free = freePost.get();

        free.views();

        return FreePostRequestDto.builder()
                .id(free.getId())
                .memberId(free.getMemberId())
                .title(free.getTitle())
                .detail(free.getDetail())
                .createAt(free.getCreateAt())
                .updateAt(free.getUpdateAt())
                .imagePath(free.getImagePath())
                .isAnonymous(free.isAnonymous())
                .views(free.getViews())
                .count(free.getCount())
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id) {
        freePostRepository.deleteById(id);
    }

    @Transactional
    @Override
    public List<FreePostRequestDto> searchPosts(String keyword, int page) {
        Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
        return freePostRepository.findByTitleContaining(keyword, pageable).stream()
                .map(freePost -> FreePostRequestDto.builder()
                        .id(freePost.getId())
                        .memberId(freePost.getMemberId())
                        .title(freePost.getTitle())
                        .detail(freePost.getDetail())
                        .createAt(freePost.getCreateAt())
                        .updateAt(freePost.getUpdateAt())
                        .imagePath(freePost.getImagePath())
                        .isAnonymous(freePost.isAnonymous())
                        .views(freePost.getViews())
                        .count(freePost.getCount())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void updateFreePost(Long id, FreePostRequestDto dto) {
        Optional<FreePost> byId = freePostRepository.findById(id);
        FreePost freePost = byId.get();

        freePost.updateFreePost(
                dto.getMemberId(),
                dto.getTitle(),
                dto.getDetail(),
                dto.getImagePath(),
                dto.isAnonymous());
    }
}
