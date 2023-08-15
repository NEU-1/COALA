package com.coala.backend.community.freepost.api.controller;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.freepost.api.service.FreeCommentServiceImpl;
import com.coala.backend.community.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.community.freepost.db.entity.FreeComment;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/*
* 자유게시판 댓글 controller 입니다.
*
* 댓글
*
* */

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@RequestMapping("/api/free/comment/")
public class FreeCommentController {
    private final FreeCommentServiceImpl freeCommentService;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    // 댓글 저장
    @PostMapping("save/{id}")
    public ResponseEntity<CommunityBaseResponseDto> saveComment(@PathVariable("id") Long id, @RequestBody @Valid FreeCommentRequestDto requestDto, HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = freeCommentService.saveComment(id, requestDto, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 댓글 수정
    @PutMapping("update/{id}")
    public ResponseEntity<CommunityBaseResponseDto> updateComment(@PathVariable("id") Long id,
                                                    @RequestBody @Valid FreeCommentRequestDto requestDto,
                                                     HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = freeCommentService.updateFreeComment(id, requestDto, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 댓글 목록
    @GetMapping("{id}/{page}")
    public ResponseEntity<CommunityBaseResponseDto> freeCommentList(@PathVariable("page") int page,
                                                                    @PathVariable Long id,
                                                                    HttpServletRequest httpServletRequest) {
        CommunityBaseResponseDto responseDto = freeCommentService.getCommentList(id, page, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 댓글 삭제
    @DeleteMapping("delete/{id}")
    public void freeCommentDelete(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        freeCommentService.deleteComment(id, getEmail(httpServletRequest));
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
