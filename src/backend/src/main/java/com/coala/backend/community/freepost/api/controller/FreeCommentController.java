package com.coala.backend.community.freepost.api.controller;

import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.freepost.db.dto.response.FreeCommentResponseDto;
import com.coala.backend.community.freepost.api.service.FreeCommentServiceImpl;
import com.coala.backend.community.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.community.freepost.db.entity.FreeComment;
import com.coala.backend.community.freepost.db.repository.FreeCommentRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private final FreeCommentRepository freeCommentRepository;

    // 댓글 저장
    @PostMapping("save")
    public ResponseEntity<FreeComment> saveComment(@RequestBody @Valid FreeCommentRequestDto requestDto) {
        freeCommentService.saveComment(requestDto);

        return ResponseEntity.ok()
                .body(requestDto.toEntity());
    }

    @PutMapping("update/{id}")
    public ResponseEntity<FreeComment> updateComment(@PathVariable("id") Long id,
                                                    @RequestBody @Valid FreeCommentRequestDto requestDto) {

        freeCommentService.updateFreeComment(id, requestDto);
        Optional<FreeComment> findComment = freeCommentRepository.findById(id);
        FreeComment freeComment = findComment.get();

        return ResponseEntity.ok()
                .body(freeComment);
    }

    @GetMapping("{id}/{page}")
    public ResponseEntity<BasePostResponseDto> freeCommentList(@PathVariable("page") Integer page,
                                                        @PathVariable Long id) {
        BasePostResponseDto commentAll = freeCommentService.getCommentList(id, page);

        return ResponseEntity.status(commentAll.getStatusCode())
                .body(commentAll);
    }

    @DeleteMapping("delete/{id}")
    public void freeCommentDelete(@PathVariable("id") Long id) {
        freeCommentService.deleteComment(id);
    }
}
