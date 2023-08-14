package com.coala.backend.community.techpost.api.controller;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.api.service.TechPostService;
import com.coala.backend.community.techpost.api.service.TechPostServiceImpl;
import com.coala.backend.community.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.community.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/*
    테크게시판 controller 입니다.
*/

@Slf4j
@RestController
@CrossOrigin(origins="*")
@RequiredArgsConstructor
@RequestMapping("/api/tech/post/")
public class TechPostController {
    private final TechPostService techPostService;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    // 게시글 저장
    @PostMapping("save")
    public ResponseEntity<CommunityBaseResponseDto> saveTechPost(@RequestBody @Valid TechPostRequestDto requestDto,
                                                                 HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = techPostService.savePost(requestDto, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 게시글 수정
    @PutMapping("update/{id}")
    public ResponseEntity<CommunityBaseResponseDto> updateTechPost(@PathVariable("id") Long id,
                                                                   @RequestBody @Valid TechPostRequestDto requestDto,
                                                                   HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = techPostService.updateTechPost(id, requestDto, getEmail(httpServletRequest));


        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("{page}")
    public ResponseEntity<CommunityBaseResponseDto> techPostList(@PathVariable("page") Integer page,
                                                                 HttpServletRequest httpServletRequest) {
        CommunityBaseResponseDto responseDto = techPostService.getPostList(page, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("search/{keyword}/{page}")
    public ResponseEntity<CommunityBaseResponseDto> findTechPosts(@PathVariable("keyword") String keyword,
                                                                  @PathVariable("page") Integer page,
                                                                  HttpServletRequest httpServletRequest) {
        CommunityBaseResponseDto responseDto = techPostService.searchPosts(keyword, page, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 게시물 상세화면
    @GetMapping("detail/{id}")
    public ResponseEntity<TechPostResponseDto> detailTechPost(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        TechPostResponseDto techPostDto = techPostService.getPost(id, getEmail(httpServletRequest));

        return ResponseEntity.ok()
                .body(techPostDto);
    }
    
    // 게시물 삭제
    @DeleteMapping("delete/{id}")
    public void techPostDelete(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        techPostService.deletePost(id, getEmail(httpServletRequest));
    }

    public Member getEmail(HttpServletRequest httpServletRequest) {
        accessToken = jwtTokenProvider.getHeaderToken(httpServletRequest, "Access");
        String email = jwtTokenProvider.getEmailFromToken(accessToken);

        Member member = memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("작성자 ID가 존재하지 않습니다.");
        });

        return member;
    }
}