package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeCommentRequestDto;

import java.util.List;

public interface FreeCommentService {
    public void saveComment (FreeCommentRequestDto commentDto);
    public List<FreeCommentRequestDto> getCommentList(int page);    // 정보를 담기 위한 List
    public void deleteComment(Long id); // 댓글 삭제
    public void updateFreeComment(Long id, FreeCommentRequestDto dto); // id와 dto를 통해 새로운 내용으로 업데이트
}
