package com.coala.backend.community.freepost.api.controller;

import com.coala.backend.community.freepost.api.service.FreePostService;
import com.coala.backend.community.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.freepost.db.dto.response.FreePostResponseDto;
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
    자유게시판 controller 입니다.
*/

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@RequestMapping("/api/free/post/")
public class FreePostController {
    private final FreePostService freePostService;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    // 게시글 저장
    @PostMapping("save")
    public ResponseEntity<CommunityBaseResponseDto> savePost(@RequestBody @Valid FreePostRequestDto requestDto,
                                   HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = freePostService.savePost(requestDto, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 게시글 수정
    @PutMapping("update/{id}")
    public ResponseEntity<CommunityBaseResponseDto> updatePost(@PathVariable("id") Long id,
                                               @RequestBody @Valid FreePostRequestDto requestDto,
                                               HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = freePostService.updateFreePost(id, requestDto, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("{page}")
    public ResponseEntity<CommunityBaseResponseDto> freePostList(@PathVariable("page") Integer page, HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = freePostService.getPostList(page, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    // 검색어 관련 게시물 불러오기
    @GetMapping("search/{keyword}/{page}")
    public ResponseEntity<CommunityBaseResponseDto> findFreePosts(@PathVariable("keyword") String keyword,
                                                                  @PathVariable("page") Integer page,
                                                                  HttpServletRequest httpServletRequest) {
        CommunityBaseResponseDto responseDto = freePostService.searchPosts(keyword, page, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    // 게시물 상세화면
    @GetMapping("detail/{id}")
    public ResponseEntity<FreePostResponseDto> detailFreePost(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        FreePostResponseDto freePostDto = freePostService.getPost(id, getEmail(httpServletRequest));

        return ResponseEntity.ok()
                .body(freePostDto);
    }

    // 게시물 삭제
    @DeleteMapping("delete/{id}")
    public void freePostDelete(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        freePostService.deletePost(id, getEmail(httpServletRequest));
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