package com.coala.backend.techpost.api.service;

import com.coala.backend.techpost.db.dto.request.TechCommentRequestDto;

public interface TechCommentService {
    public void saveComment (TechCommentRequestDto commentDto);
}
