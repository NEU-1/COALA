package com.coala.backend.freepost.api.controller;

import com.coala.backend.freepost.api.service.FreeCommentServiceImpl;
import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.freepost.db.dto.response.FreeCommentResponseDto;
import com.coala.backend.freepost.db.repository.FreeCommentRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/free/")
public class FreeCommentController {
    private final FreeCommentServiceImpl freeCommentService;
    private final FreeCommentRepository freeCommentRepository;

    // 댓글 저장
    @PostMapping("comment/save")
    public FreeCommentResponseDto saveComment(@RequestBody @Valid FreeCommentRequestDto requestDto) {
        freeCommentService.saveComment(requestDto);

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
