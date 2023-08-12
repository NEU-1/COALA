package com.coala.backend.community.notice.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.notice.db.dto.response.NoticeResponseDto;
import com.coala.backend.community.notice.db.dto.request.NoticeRequestDto;


public interface NoticeService {
    public CommunityBaseResponseDto savePost (NoticeRequestDto postDto);    // 요청 받은 Dto를 활용해서 post를 저장
    public CommunityBaseResponseDto getPostList(int page);    // Board 정보를 담기 위한 List
    public NoticeResponseDto getPost(Long id); // 요청 받은 게시판 id를 통해 Dto에서 정보 불러오기
    public void deletePost(Long id); // 게시글 삭제
    public CommunityBaseResponseDto searchPosts(String keyword, int page); // 키워드를 통해 검색해서 List 만들기
    public CommunityBaseResponseDto updateNotice(Long id, NoticeRequestDto dto); // id와 dto를 통해 새로운 내용으로 업데이트
}
