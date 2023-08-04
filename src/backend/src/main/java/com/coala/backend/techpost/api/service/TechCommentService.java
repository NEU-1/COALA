package com.coala.backend.techpost.api.service;

import com.coala.backend.techpost.db.dto.request.TechCommentRequestDto;

import java.util.List;

public interface TechCommentService {
    public void saveComment (TechCommentRequestDto commentDto);
    public List<TechCommentRequestDto> getCommentList(int page);    // 정보를 담기 위한 List
    public void deleteComment(Long id); // 댓글 삭제
    public void updateFreeComment(Long id, TechCommentRequestDto dto); // id와 dto를 통해 새로운 내용으로 업데이트
}
