package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.freepost.db.entity.FreeComment;
import com.coala.backend.freepost.db.repository.FreeCommentRepository;
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


    @Transactional
    @Override
    public void saveComment(FreeCommentRequestDto commentDto) {

        freeCommentRepository.save(commentDto.toEntity());
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
        freeCommentRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void updateFreeComment(Long id, FreeCommentRequestDto dto) {
        Optional<FreeComment> byId = freeCommentRepository.findById(id);
        FreeComment freeComment = byId.get();

        freeComment.updateFreeComment(dto.getAuthor(), dto.getContent());
    }
}
