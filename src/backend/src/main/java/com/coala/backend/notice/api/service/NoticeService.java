package com.coala.backend.notice.api.service;

import com.coala.backend.notice.db.dto.request.NoticeRequestDto;

import java.util.List;

public interface NoticeService {
    public void savePost (NoticeRequestDto postDto);    // 요청 받은 Dto를 활용해서 post를 저장
    public List<NoticeRequestDto> getPostList(int page);    // Board 정보를 담기 위한 List
    public NoticeRequestDto getPost(Long id); // 요청 받은 게시판 id를 통해 Dto에서 정보 불러오기
    public void deletePost(Long id); // 게시글 삭제
    public List<NoticeRequestDto> searchPosts(String keyword, int page); // 키워드를 통해 검색해서 List 만들기
    public void updateNotice(Long id, NoticeRequestDto dto); // id와 dto를 통해 새로운 내용으로 업데이트
}
