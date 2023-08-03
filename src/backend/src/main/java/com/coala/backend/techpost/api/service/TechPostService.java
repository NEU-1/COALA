package com.coala.backend.techpost.api.service;

import com.coala.backend.techpost.db.dto.request.TechPostRequestDto;

import java.util.List;

public interface TechPostService {
    public void savePost (TechPostRequestDto PostDto);    // 요청 받은 Dto를 활용해서 post를 저장
    public List<TechPostRequestDto> getPostList(int page);    // Post 정보를 담기 위한 List
    public TechPostRequestDto getPost(Long id); // 요청 받은 게시판 id를 통해 Dto에서 정보 불러오기
    public void deletePost(Long id); // 삭제
    public List<TechPostRequestDto> searchPosts(String keyword, int page); // 키워드를 통해 검색해서 List 만들기
    public void updateTechPost(Long id, TechPostRequestDto dto); // id와 dto를 통해 새로운 내용으로 업데이트
}
