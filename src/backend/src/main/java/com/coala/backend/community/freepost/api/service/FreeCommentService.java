package com.coala.backend.community.freepost.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.member.db.entity.Member;

public interface FreeCommentService {
    public CommunityBaseResponseDto saveComment (Long id, FreeCommentRequestDto commentDto, Member member);
    public CommunityBaseResponseDto getCommentList(Long id, int page, Member member);    // 정보를 담기 위한 List
    public void deleteComment(Long id, Member member); // 댓글 삭제
    public CommunityBaseResponseDto updateFreeComment(Long id, FreeCommentRequestDto dto, Member member); // id와 dto를 통해 새로운 내용으로 업데이트
}
