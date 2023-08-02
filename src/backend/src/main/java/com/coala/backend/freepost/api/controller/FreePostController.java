package com.coala.backend.freepost.api.controller;

import com.coala.backend.freepost.api.service.FreeCommentServiceImpl;
import com.coala.backend.freepost.api.service.FreePostServiceImpl;
import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.freepost.db.dto.response.FreeCommentResponseDto;
import com.coala.backend.freepost.db.dto.response.FreePostResponseDto;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.freepost.db.repository.FreeCommentRepository;
import com.coala.backend.freepost.db.repository.FreePostRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
    자유게시판 controller 입니다.
    - 업데이트 시 추천수미구현, 페이징 기능 개선 필요
*/

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class FreePostController {
    private final FreePostServiceImpl freePostService;
    private final FreePostRepository freePostRepository;
    private final FreeCommentServiceImpl freeCommentService;
    private final FreeCommentRepository freeCommentRepository;

    // 게시글 저장
    @PostMapping("api/free/post/save")
    public FreePostResponseDto savePost(@RequestBody @Valid FreePostRequestDto requestDto) {
        freePostService.savePost(requestDto);

        return new FreePostResponseDto(
                requestDto.toEntity().getId(),
                requestDto.toEntity().getUserId(),
                requestDto.toEntity().getTitle(),
                requestDto.toEntity().getDetail(),
                requestDto.toEntity().getCreateAt(),
                requestDto.toEntity().getUpdateAt(),
                requestDto.toEntity().getImagePath(),
                requestDto.toEntity().isAnonymous(),
                requestDto.toEntity().getViews(),
                requestDto.toEntity().getCount());
    }

    // 게시글 수정
    @PutMapping("api/free/post/update/{id}")
    public FreePostResponseDto updateFreePost(@PathVariable("id") Long id,
                                              @RequestBody @Valid FreePostRequestDto requestDto) {
        freePostService.updateFreePost(id, requestDto);
        Optional<FreePost> findPost = freePostRepository.findById(id);
        FreePost freePost = findPost.get();

        return new FreePostResponseDto(
                freePost.getId(),
                freePost.getUserId(),
                freePost.getTitle(),
                freePost.getDetail(),
                freePost.getCreateAt(),
                freePost.getUpdateAt(),
                freePost.getImagePath(),
                freePost.isAnonymous(),
                freePost.getViews(),
                freePost.getCount());
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("api/free/post/{page}")
    public List<FreePostResponseDto> freePostList(@PathVariable("page") Integer page) {
        List<FreePostRequestDto> postAll = freePostService.getPostList(page);

        return postAll.stream()
                .map(freePostRequestDto -> new FreePostResponseDto(
                        freePostRequestDto.getId(),
                        freePostRequestDto.getUserId(),
                        freePostRequestDto.getTitle(),
                        freePostRequestDto.getDetail(),
                        freePostRequestDto.getCreateAt(),
                        freePostRequestDto.getUpdateAt(),
                        freePostRequestDto.getImagePath(),
                        freePostRequestDto.isAnonymous(),
                        freePostRequestDto.getViews(),
                        freePostRequestDto.getCount())).collect(Collectors.toList());
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("api/free/post/search/{keyword}/{page}")
    public List<FreePostResponseDto> findPosts(@PathVariable("keyword") String keyword,
                                               @PathVariable("page") Integer page) {
        List<FreePostRequestDto> findAll = freePostService.searchPosts(keyword, page);

        return findAll.stream()
                .map(freePostRequestDto -> new FreePostResponseDto(
                        freePostRequestDto.getId(),
                        freePostRequestDto.getUserId(),
                        freePostRequestDto.getTitle(),
                        freePostRequestDto.getDetail(),
                        freePostRequestDto.getCreateAt(),
                        freePostRequestDto.getUpdateAt(),
                        freePostRequestDto.getImagePath(),
                        freePostRequestDto.isAnonymous(),
                        freePostRequestDto.getViews(),
                        freePostRequestDto.getCount())).collect(Collectors.toList());
    }

    // 게시물 상세화면
    @GetMapping("api/free/post/detail/{id}")
    public FreePostResponseDto detailPost(@PathVariable("id") Long id) {
        FreePostRequestDto freePostDto = freePostService.getPost(id);

        return new FreePostResponseDto(
                freePostDto.getId(),
                freePostDto.getUserId(),
                freePostDto.getTitle(),
                freePostDto.getDetail(),
                freePostDto.getCreateAt(),
                freePostDto.getUpdateAt(),
                freePostDto.getImagePath(),
                freePostDto.isAnonymous(),
                freePostDto.getViews(),
                freePostDto.getCount());
    }
    
    // 게시물 삭제
    @DeleteMapping("api/free/delete/{id}")
    public void freePostDelete(@PathVariable("id") Long id) {freePostService.deletePost(id);}

    // 댓글 저장
    @PostMapping("api/free/comment/save")
    public FreeCommentResponseDto saveComment(@RequestBody @Valid FreeCommentRequestDto requestDto) {
        freeCommentService.savePost(requestDto);

        return new FreeCommentResponseDto(
                requestDto.toEntity().getId(),
                requestDto.toEntity().getFpId(),
                requestDto.toEntity().getAuthor(),
                requestDto.toEntity().getContent(),
                requestDto.toEntity().getCreateAt(),
                requestDto.toEntity().getUpdateAt()
        );
    }
}