package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.freepost.db.repository.FreeCommentRepository;
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
