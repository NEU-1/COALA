package com.coala.backend.techpost.api.service;

import com.coala.backend.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.techpost.db.entity.TechComment;
import com.coala.backend.techpost.db.repository.TechCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

;

@Service
@RequiredArgsConstructor
public class TechCommentServiceImpl implements TechCommentService {
    private final TechCommentRepository techCommentRepository;

    @Transactional
    @Override
    public void saveComment(TechCommentRequestDto commentDto) {
        techCommentRepository.save(commentDto.toEntity());
    }

    @Transactional
    @Override
    public List<TechCommentRequestDto> getCommentList(int page) {
        Pageable pageable = PageRequest.of(page, 3, Sort.by("createAt").descending());
        return techCommentRepository.findAll(pageable).stream()
                .map(techComment -> TechCommentRequestDto.builder()
                        .id(techComment.getId())
                        .fpId(techComment.getFpId())
                        .author(techComment.getAuthor())
                        .content(techComment.getContent())
                        .createAt(techComment.getCreateAt())
                        .updateAt(techComment.getUpdateAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteComment(Long id) {
        techCommentRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void updateFreeComment(Long id, TechCommentRequestDto dto) {
        Optional<TechComment> byId = techCommentRepository.findById(id);
        TechComment techComment = byId.get();

        techComment.updateTechComment(dto.getAuthor(), dto.getContent());
    }
}
