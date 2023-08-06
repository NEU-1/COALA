package com.coala.backend.techpost.api.controller;

import com.coala.backend.techpost.api.service.TechPostServiceImpl;
import com.coala.backend.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.techpost.db.entity.TechPost;
import com.coala.backend.techpost.db.repository.TechPostRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
    테크게시판 controller 입니다.
*/

@Slf4j
@RestController
@CrossOrigin(origins="*")
@RequiredArgsConstructor
@RequestMapping("/api/tech/post/")
public class TechPostController {
    private final TechPostServiceImpl techPostService;
    private final TechPostRepository techPostRepository;

    // 게시글 저장
    @PostMapping("save")
    public ResponseEntity<TechPost> saveTechPost(@RequestBody @Valid TechPostRequestDto requestDto) {

        techPostService.savePost(requestDto);

        return ResponseEntity.ok()
                .header("성공", "게시글 작성")
                .body(requestDto.toEntity());
    }

    // 게시글 수정
    @PutMapping("update/{id}")
    public ResponseEntity<TechPost> updateTechPost(@PathVariable("id") Long id,
                                                   @RequestBody @Valid TechPostRequestDto requestDto) {
        techPostService.updateTechPost(id, requestDto);
        Optional<TechPost> findPost = techPostRepository.findById(id);
        TechPost techPost = findPost.get();

        return ResponseEntity.ok()
                .header("성공", "게시글 수정")
                .body(techPost);
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("{page}")
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
                        techPostRequestDto.getCommentCount(),
                        techPostRequestDto.getGoodCount()))
                .collect(Collectors.toList());
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("search/{keyword}/{page}")
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
                        techPostRequestDto.getCommentCount(),
                        techPostRequestDto.getGoodCount()))
                .collect(Collectors.toList());
    }

    // 게시물 상세화면
    @GetMapping("detail/{id}")
    public ResponseEntity<TechPostRequestDto> detailTechPost(@PathVariable("id") Long id) {
        TechPostRequestDto techPostDto = techPostService.getPost(id);

        return ResponseEntity.ok()
                .header("성공", "게시글 상세")
                .body(techPostDto);
    }
    
    // 게시물 삭제
    @DeleteMapping("delete/{id}")
    public void techPostDelete(@PathVariable("id") Long id, @RequestBody @Valid TechPostRequestDto techPostRequestDto) {techPostService.deletePost(id, techPostRequestDto);}
}