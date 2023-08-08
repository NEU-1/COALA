package com.coala.backend.community.techpost.api.controller;

import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.techpost.api.service.TechCommentServiceImpl;
import com.coala.backend.community.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.community.techpost.db.dto.response.TechCommentResponseDto;
import com.coala.backend.community.techpost.db.entity.TechComment;
import com.coala.backend.community.techpost.db.repository.TechCommentRepository;
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
@RequestMapping("/api/tech/comment/")
public class TechCommentController {
    private final TechCommentServiceImpl techCommentService;
    private final TechCommentRepository techCommentRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    // 댓글 저장
    @PostMapping("save")
    public ResponseEntity<TechComment> saveComment(@RequestBody @Valid TechCommentRequestDto requestDto) {
        techCommentService.saveComment(requestDto);

        return ResponseEntity.ok()
                .body(requestDto.toEntity());
    }

    @PutMapping("update/{id}")
    public ResponseEntity<TechCommentResponseDto> updateTechComment(@PathVariable("id") Long id,
                                                    @RequestBody @Valid TechCommentRequestDto requestDto) {

        techCommentService.updateTechComment(id, requestDto);
        TechComment techComment = techCommentRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });

        return ResponseEntity.ok()
                .body(TechCommentResponseDto.builder()
                        .id(techComment.getId())
                        .tpId(techComment.getTpId())
                        .author(techComment.getAuthor())
                        .content(techComment.getContent())
                        .createAt(techComment.getCreateAt())
                        .updateAt(techComment.getUpdateAt())
                        .build());
    }

    @GetMapping("{id}/{page}")
    public ResponseEntity<BasePostResponseDto> techCommentList(@PathVariable("id") Long id, @PathVariable("page") int page) {
        BasePostResponseDto commentAll = techCommentService.getCommentList(id, page);

        return ResponseEntity.status(commentAll.getStatusCode())
                .body(commentAll);
    }

    @DeleteMapping("delete/{id}")
    public void techCommentDelete(@PathVariable("id") Long id) {
        techCommentService.deleteComment(id);
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
