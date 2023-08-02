package com.coala.backend.api.service;

import com.coala.backend.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.db.repository.FreeCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FreeCommentServiceImpl implements FreeCommentService{
    private final FreeCommentRepository freeCommentRepository;

    @Autowired
    public FreeCommentServiceImpl(FreeCommentRepository freeCommentRepository) {
        this.freeCommentRepository = freeCommentRepository;
    }

    @Transactional
    @Override
    public void savePost(FreeCommentRequestDto commentDto) {
        freeCommentRepository.save(commentDto.toEntity());
    }
}
