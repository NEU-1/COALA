package com.coala.backend.techpost.api.controller;

import com.coala.backend.techpost.api.service.TechCommentServiceImpl;
import com.coala.backend.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.techpost.db.dto.response.TechCommentResponseDto;
import com.coala.backend.techpost.db.entity.TechComment;
import com.coala.backend.techpost.db.repository.TechCommentRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    // 댓글 저장
    @PostMapping("save")
    public ResponseEntity<TechComment> saveComment(@RequestBody @Valid TechCommentRequestDto requestDto) {
        techCommentService.saveComment(requestDto);

        return ResponseEntity.ok()
                .header("성공", "댓글 저장")
                .body(requestDto.toEntity());
    }

    @PutMapping("update/{id}")
    public ResponseEntity<TechComment> updateTechComment(@PathVariable("id") Long id,
                                                    @RequestBody @Valid TechCommentRequestDto requestDto) {

        techCommentService.updateTechComment(id, requestDto);
        Optional<TechComment> findComment = techCommentRepository.findById(id);
        TechComment techComment = findComment.get();

        return ResponseEntity.ok()
                .header("성공", "댓글 수정")
                .body(techComment);
    }

    @GetMapping("{page}")
    public List<TechCommentResponseDto> techCommentList(@PathVariable("page") Integer page) {
        List<TechCommentRequestDto> commentAll = techCommentService.getCommentList(page);

        return commentAll.stream()
                .map(techCommentRequestDto -> new TechCommentResponseDto(
                        techCommentRequestDto.getTpId(),
                        techCommentRequestDto.getAuthor(),
                        techCommentRequestDto.getContent(),
                        techCommentRequestDto.getCreateAt()))
                .collect(Collectors.toList());
    }

    @DeleteMapping("delete/{id}")
    public void techCommentDelete(@PathVariable("id") Long id) {
        techCommentService.deleteComment(id);
    }
}
