package com.coala.backend.freepost.api.controller;

import com.coala.backend.freepost.api.service.FreePostServiceImpl;
import com.coala.backend.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.freepost.db.dto.response.FreePostResponseDto;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.freepost.db.repository.FreePostRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
    자유게시판 controller 입니다.
    - 업데이트 시 추천수미구현, 페이징 기능 개선 필요
*/

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@RequestMapping("/api/free/")
public class FreePostController {
    private final FreePostServiceImpl freePostService;
    private final FreePostRepository freePostRepository;

    // 게시글 저장
    @PostMapping("post/save")
    public ResponseEntity savePost(@RequestBody @Valid FreePostRequestDto requestDto) {

        freePostService.savePost(requestDto);

        return ResponseEntity.status(HttpStatus.OK)
                .header("게시글 작성", "성공")
                .body(requestDto.toEntity());
    }

    // 게시글 수정
    @PutMapping("post/update/{id}")
    public ResponseEntity updatePost(@PathVariable("id") Long id,
                                     @RequestBody @Valid FreePostRequestDto requestDto) {
        freePostService.updateFreePost(id, requestDto);
        Optional<FreePost> findPost = freePostRepository.findById(id);
        FreePost freePost = findPost.get();

        return ResponseEntity.status(HttpStatus.OK)
                .header("게시글 수정", "성공")
                .body(freePost);
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("post/{page}")
    public List<FreePostResponseDto> freePostList(@PathVariable("page") Integer page) {
        List<FreePostRequestDto> postAll = freePostService.getPostList(page);

        return postAll.stream()
                .map(freePostRequestDto -> new FreePostResponseDto(
                        freePostRequestDto.getMemberId(),
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
    @GetMapping("post/search/{keyword}/{page}")
    public List<FreePostResponseDto> findPosts(@PathVariable("keyword") String keyword,
                                               @PathVariable("page") Integer page) {
        List<FreePostRequestDto> findAll = freePostService.searchPosts(keyword, page);

        return findAll.stream()
                .map(freePostRequestDto -> new FreePostResponseDto(
                        freePostRequestDto.getMemberId(),
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
    @GetMapping("post/detail/{id}")
    public FreePostResponseDto detailPost(@PathVariable("id") Long id) {
        FreePostRequestDto freePostDto = freePostService.getPost(id);

        return new FreePostResponseDto(
                freePostDto.getMemberId(),
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
    @DeleteMapping("post/delete/{id}")
    public void freePostDelete(@PathVariable("id") Long id) {freePostService.deletePost(id);}
}