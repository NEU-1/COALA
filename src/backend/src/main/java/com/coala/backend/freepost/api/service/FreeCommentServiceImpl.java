package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.freepost.db.repository.FreeCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FreeCommentServiceImpl implements FreeCommentService{
    private final FreeCommentRepository freeCommentRepository;


    @Transactional
    @Override
    public void saveComment(FreeCommentRequestDto commentDto) {
        freeCommentRepository.save(commentDto.toEntity());
    }
}
