package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;

public interface FreeCommentService {
    public void savePost (FreeCommentRequestDto commentDto);
}
