package com.coala.backend.techpost.api.controller;

import com.coala.backend.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.techpost.db.dto.response.TechCommentResponseDto;
import com.coala.backend.techpost.api.service.TechCommentServiceImpl;
import com.coala.backend.techpost.db.repository.TechCommentRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tech/")
public class TechCommentController {
    private final TechCommentServiceImpl techCommentService;
    private final TechCommentRepository techCommentRepository;

    // 댓글 저장
    @PostMapping("comment/save")
    public TechCommentResponseDto saveComment(@RequestBody @Valid TechCommentRequestDto requestDto) {
        techCommentService.saveComment(requestDto);

        return new TechCommentResponseDto(
                requestDto.toEntity().getId(),
                requestDto.toEntity().getFpId(),
                requestDto.toEntity().getAuthor(),
                requestDto.toEntity().getContent(),
                requestDto.toEntity().getCreateAt(),
                requestDto.toEntity().getUpdateAt()
        );
    }
}
