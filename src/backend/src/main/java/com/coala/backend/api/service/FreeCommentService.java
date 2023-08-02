package com.coala.backend.api.service;

import com.coala.backend.db.dto.request.FreeCommentRequestDto;

public interface FreeCommentService {
    public void savePost (FreeCommentRequestDto commentDto);
}
