package com.coala.backend.community.techpost.api.service;

import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.community.techpost.db.dto.response.TechCommentResponseDto;
import com.coala.backend.community.techpost.db.entity.TechComment;
import com.coala.backend.community.techpost.db.entity.TechPost;
import com.coala.backend.community.techpost.db.repository.TechCommentRepository;
import com.coala.backend.community.techpost.db.repository.TechPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechCommentServiceImpl implements TechCommentService {
    private final TechCommentRepository techCommentRepository;
    private final TechPostRepository techPostRepository;

    @Transactional
    @Override
    public void saveComment(TechCommentRequestDto commentDto) {
        TechPost techPost = techPostRepository.findById(commentDto.getTpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        techCommentRepository.saveAndFlush(commentDto.toEntity());
        techPost.getComments().add(commentDto.toEntity());
    }

    @Transactional
    @Override
    public BasePostResponseDto getCommentList(Long id, int page) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by("createAt").descending());

        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        List<TechCommentResponseDto> postComments = techCommentRepository.findByTpId(techPost, pageable).stream()
                .map(techComment -> TechCommentResponseDto.builder()
                        .tpId(techComment.getTpId())
                        .author(techComment.getAuthor())
                        .content(techComment.getContent())
                        .createAt(techComment.getCreateAt())
                        .updateAt(techComment.getUpdateAt())
                        .build())
                .collect(Collectors.toList());

        return BasePostResponseDto.builder()
                .statusCode(200)
                .msg("성공")
                .detail(postComments.size())
                .list(postComments)
                .build();
    }

    @Transactional
    @Override
    public void deleteComment(Long id) {
        TechComment techComment = techCommentRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });

        TechPost techPost = techPostRepository.findById(techComment.getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        techCommentRepository.deleteById(id);
        techPost.getComments().remove(techComment);
    }

    @Transactional
    @Override
    public void updateTechComment(Long id, TechCommentRequestDto dto) {
        TechComment techComment = techCommentRepository.findById(id).orElseThrow(() -> {
           return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });

        techComment.updateTechComment(dto.getAuthor(), dto.getContent());
    }
}
