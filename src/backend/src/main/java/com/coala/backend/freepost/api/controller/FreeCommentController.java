package com.coala.backend.freepost.api.controller;

import com.coala.backend.freepost.api.service.FreeCommentServiceImpl;
import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.freepost.db.dto.response.FreeCommentResponseDto;
import com.coala.backend.freepost.db.entity.FreeComment;
import com.coala.backend.freepost.db.repository.FreeCommentRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
* 자유게시판 댓글 controller 입니다.
* */

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
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
                requestDto.toEntity().getCreateAt()
        );
    }

    @PutMapping("comment/update/{id}")
    public FreeCommentResponseDto updateComment(@PathVariable("id") Long id,
                                                    @RequestBody @Valid FreeCommentRequestDto requestDto) {

        freeCommentService.updateFreeComment(id, requestDto);
        Optional<FreeComment> findComment = freeCommentRepository.findById(id);
        FreeComment freeComment = findComment.get();

        return new FreeCommentResponseDto(
                freeComment.getId(),
                freeComment.getFpId(),
                freeComment.getAuthor(),
                freeComment.getContent(),
                freeComment.getCreateAt());
    }

    @GetMapping("comment/{page}")
    public List<FreeCommentResponseDto> freeCommentList(@PathVariable("page") Integer page) {
        List<FreeCommentRequestDto> commentAll = freeCommentService.getCommentList(page);

        return commentAll.stream()
                .map(freeCommentRequestDto -> new FreeCommentResponseDto(
                        freeCommentRequestDto.getId(),
                        freeCommentRequestDto.getFpId(),
                        freeCommentRequestDto.getAuthor(),
                        freeCommentRequestDto.getContent(),
                        freeCommentRequestDto.getCreateAt()))
                .collect(Collectors.toList());
    }

    @DeleteMapping("comment/delete/{id}")
    public void freeCommentDelete(@PathVariable("id") Long id) {
        freeCommentService.deleteComment(id);
    }
}
