package com.coala.backend.community.techpost.api.service;

import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechCommentRequestDto;

public interface TechCommentService {
    public void saveComment (TechCommentRequestDto commentDto);
    public BasePostResponseDto getCommentList(Long id, int page);    // 정보를 담기 위한 List
    public void deleteComment(Long id); // 댓글 삭제
    public void updateTechComment(Long id, TechCommentRequestDto dto); // id와 dto를 통해 새로운 내용으로 업데이트
}
