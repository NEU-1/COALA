package com.coala.backend.techpost.api.controller;

import com.coala.backend.techpost.api.service.TechCommentServiceImpl;
import com.coala.backend.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.techpost.db.dto.response.TechCommentResponseDto;
import com.coala.backend.techpost.db.entity.TechComment;
import com.coala.backend.techpost.db.repository.TechCommentRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
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
                requestDto.toEntity().getCreateAt()
        );
    }

    @PutMapping("comment/update/{id}")
    public TechCommentResponseDto updateTechComment(@PathVariable("id") Long id,
                                                    @RequestBody @Valid TechCommentRequestDto requestDto) {

        techCommentService.updateFreeComment(id, requestDto);
        Optional<TechComment> findComment = techCommentRepository.findById(id);
        TechComment techComment = findComment.get();

        return new TechCommentResponseDto(
                techComment.getId(),
                techComment.getFpId(),
                techComment.getAuthor(),
                techComment.getContent(),
                techComment.getCreateAt());
    }

    @GetMapping("comment/{page}")
    public List<TechCommentResponseDto> techCommentList(@PathVariable("page") Integer page) {
        List<TechCommentRequestDto> commentAll = techCommentService.getCommentList(page);

        return commentAll.stream()
                .map(techCommentRequestDto -> new TechCommentResponseDto(
                        techCommentRequestDto.getId(),
                        techCommentRequestDto.getFpId(),
                        techCommentRequestDto.getAuthor(),
                        techCommentRequestDto.getContent(),
                        techCommentRequestDto.getCreateAt()))
                .collect(Collectors.toList());
    }

    @DeleteMapping("comment/delete/{id}")
    public void techCommentDelete(@PathVariable("id") Long id) {
        techCommentService.deleteComment(id);
    }
}
