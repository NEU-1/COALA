package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.freepost.db.entity.FreeComment;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.freepost.db.repository.FreeCommentRepository;
import com.coala.backend.freepost.db.repository.FreePostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FreeCommentServiceImpl implements FreeCommentService{
    private final FreeCommentRepository freeCommentRepository;
    private final FreePostRepository freePostRepository;

    @Transactional
    @Override
    public void saveComment(FreeCommentRequestDto commentDto) {
        FreePost freePost = freePostRepository.findById(commentDto.getFpId().getId()).orElseThrow(()-> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        freeCommentRepository.saveAndFlush(commentDto.toEntity());
        freePost.getComments().add(commentDto.toEntity());
    }

    @Transactional
    @Override
    public List<FreeCommentRequestDto> getCommentList(int page) {
        Pageable pageable = PageRequest.of(page, 3, Sort.by("createAt").descending());
        return freeCommentRepository.findAll(pageable).stream()
                .map(freeComment -> FreeCommentRequestDto.builder()
                        .id(freeComment.getId())
                        .fpId(freeComment.getFpId())
                        .author(freeComment.getAuthor())
                        .content(freeComment.getContent())
                        .createAt(freeComment.getCreateAt())
                        .updateAt(freeComment.getUpdateAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteComment(Long id) {
        FreeComment freeComment = freeCommentRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });
        FreePost freePost = freePostRepository.findById(freeComment.getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        freeCommentRepository.deleteById(id);
        freePost.getComments().remove(freeComment);
    }

    @Transactional
    @Override
    public void updateFreeComment(Long id, FreeCommentRequestDto dto) {
        FreeComment freeComment = freeCommentRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });

        freeComment.updateFreeComment(dto.getAuthor(), dto.getContent());
    }
}
