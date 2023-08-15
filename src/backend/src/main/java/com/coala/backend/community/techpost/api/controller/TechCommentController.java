package com.coala.backend.community.techpost.api.controller;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.api.service.TechCommentServiceImpl;
import com.coala.backend.community.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
* 테크게시판 댓글 controller 입니다.
* */

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@RequestMapping("/api/tech/comment")
public class TechCommentController {
    private final TechCommentServiceImpl techCommentService;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    // 댓글 저장
    @PostMapping("/save/{id}")
    public ResponseEntity<CommunityBaseResponseDto> saveComment(@PathVariable("id") Long id,
            @RequestBody @Valid TechCommentRequestDto requestDto, HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = techCommentService.saveComment(id, requestDto, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 댓글 수정
    @PutMapping("/update/{id}")
    public ResponseEntity<CommunityBaseResponseDto> updateTechComment(@PathVariable("id") Long id,
                                                                      @RequestBody @Valid TechCommentRequestDto requestDto, HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = techCommentService.updateTechComment(id, requestDto, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 댓글 목록
    @GetMapping("/{id}/{page}")
    public ResponseEntity<CommunityBaseResponseDto> techCommentList(@PathVariable("id") Long id, @PathVariable("page") int page,
                                                                    HttpServletRequest httpServletRequest) {
        CommunityBaseResponseDto responseDto = techCommentService.getCommentList(id, page, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 댓글 삭제
    @DeleteMapping("/delete/{id}")
    public void techCommentDelete(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        techCommentService.deleteComment(id, getEmail(httpServletRequest));
    }

    // Access_Token 값 조회
    public Member getEmail(HttpServletRequest httpServletRequest) {
        accessToken = jwtTokenProvider.getHeaderToken(httpServletRequest, "Access");
        String email = jwtTokenProvider.getEmailFromToken(accessToken);

        Member member = memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("작성자 ID가 존재하지 않습니다.");
        });

        return member;
    }
}
