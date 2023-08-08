package com.coala.backend.community.freepost.api.service;

import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.freepost.db.dto.request.FreeCommentRequestDto;

public interface FreeCommentService {
    public void saveComment (FreeCommentRequestDto commentDto);
    public BasePostResponseDto getCommentList(Long id, int page);    // 정보를 담기 위한 List
    public void deleteComment(Long id); // 댓글 삭제
    public void updateFreeComment(Long id, FreeCommentRequestDto dto); // id와 dto를 통해 새로운 내용으로 업데이트
}
