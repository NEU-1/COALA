package com.coala.backend.techpost.api.controller;

import com.coala.backend.techpost.api.service.TechPostServiceImpl;
import com.coala.backend.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.techpost.db.entity.TechPost;
import com.coala.backend.techpost.db.repository.TechPostRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
    테크게시판 controller 입니다.
    - 추천 수 미구현, 페이징 기능 개선 필요
*/

@RestController
@CrossOrigin(origins="*")
@RequiredArgsConstructor
@RequestMapping("/api/tech/")
public class TechPostController {
    private final TechPostServiceImpl techPostService;
    private final TechPostRepository techPostRepository;

    // 게시글 저장
    @PostMapping("post/save")
    public TechPostResponseDto saveTechPost(@RequestBody @Valid TechPostRequestDto requestDto) {
        techPostService.savePost(requestDto);
        return new TechPostResponseDto(
                requestDto.toEntity().getId(),
                requestDto.toEntity().getMemberId(),
                requestDto.toEntity().getTitle(),
                requestDto.toEntity().getDetail(),
                requestDto.toEntity().getCreateAt(),
                requestDto.toEntity().getUpdateAt(),
                requestDto.toEntity().getImagePath(),
                requestDto.toEntity().getNickname(),
                requestDto.toEntity().getViews(),
                requestDto.toEntity().getCount());
    }

    // 게시글 수정
    @PutMapping("post/update/{id}")
    public TechPostResponseDto updateTechPost(@PathVariable("id") Long id,
                                              @RequestBody @Valid TechPostRequestDto requestDto) {
        techPostService.updateTechPost(id, requestDto);
        Optional<TechPost> findPost = techPostRepository.findById(id);
        TechPost techPost = findPost.get();

        return new TechPostResponseDto(
                techPost.getId(),
                techPost.getMemberId(),
                techPost.getTitle(),
                techPost.getDetail(),
                techPost.getCreateAt(),
                techPost.getUpdateAt(),
                techPost.getImagePath(),
                techPost.getNickname(),
                techPost.getViews(),
                techPost.getCount());
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("post/{page}")
    public List<TechPostResponseDto> techPostList(@PathVariable("page") Integer page) {
        List<TechPostRequestDto> postAll = techPostService.getPostList(page);

        return postAll.stream()
                .map(techPostRequestDto -> new TechPostResponseDto(
                        techPostRequestDto.getId(),
                        techPostRequestDto.getMemberId(),
                        techPostRequestDto.getTitle(),
                        techPostRequestDto.getDetail(),
                        techPostRequestDto.getCreateAt(),
                        techPostRequestDto.getUpdateAt(),
                        techPostRequestDto.getImagePath(),
                        techPostRequestDto.getNickname(),
                        techPostRequestDto.getViews(),
                        techPostRequestDto.getCount())).collect(Collectors.toList());
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("post/search/{keyword}/{page}")
    public List<TechPostResponseDto> findTechPosts(@PathVariable("keyword") String keyword,
                                               @PathVariable("page") Integer page) {
        List<TechPostRequestDto> findAll = techPostService.searchPosts(keyword, page);

        return findAll.stream()
                .map(techPostRequestDto -> new TechPostResponseDto(
                        techPostRequestDto.getId(),
                        techPostRequestDto.getMemberId(),
                        techPostRequestDto.getTitle(),
                        techPostRequestDto.getDetail(),
                        techPostRequestDto.getCreateAt(),
                        techPostRequestDto.getUpdateAt(),
                        techPostRequestDto.getImagePath(),
                        techPostRequestDto.getNickname(),
                        techPostRequestDto.getViews(),
                        techPostRequestDto.getCount())).collect(Collectors.toList());
    }

    // 게시물 상세화면
    @GetMapping("post/detail/{id}")
    public TechPostResponseDto detailTechPost(@PathVariable("id") Long id) {
        TechPostRequestDto techPostDto = techPostService.getPost(id);

        return new TechPostResponseDto(
                techPostDto.getId(),
                techPostDto.getMemberId(),
                techPostDto.getTitle(),
                techPostDto.getDetail(),
                techPostDto.getCreateAt(),
                techPostDto.getUpdateAt(),
                techPostDto.getImagePath(),
                techPostDto.getNickname(),
                techPostDto.getViews(),
                techPostDto.getCount());
    }
    
    // 게시물 삭제
    @DeleteMapping("post/delete/{id}")
    public void techPostDelete(@PathVariable("id") Long id) {techPostService.deletePost(id);}
}