package com.coala.backend.techpost.api.service;

;
import com.coala.backend.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.techpost.db.repository.TechCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TechCommentServiceImpl implements TechCommentService {
    private final TechCommentRepository techCommentRepository;

    @Transactional
    @Override
    public void saveComment(TechCommentRequestDto commentDto) {
        techCommentRepository.save(commentDto.toEntity());
    }
}
