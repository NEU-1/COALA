package com.coala.backend.techpost.api.service;

import com.coala.backend.freepost.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.techpost.db.dto.response.TechPostResponseDto;

import java.util.List;

public interface TechPostService {
    public Member savePost (TechPostRequestDto PostDto, Member member);    // 요청 받은 Dto를 활용해서 post를 저장
    public BaseResponseDto getPostList(int page);    // Post 정보를 담기 위한 List
    public TechPostResponseDto getPost(Long id); // 요청 받은 게시판 id를 통해 Dto에서 정보 불러오기
    public void deletePost(Long id, TechPostRequestDto dto, Member member); // 삭제
    public BaseResponseDto searchPosts(String keyword, int page); // 키워드를 통해 검색해서 List 만들기
    public void updateTechPost(Long id, TechPostRequestDto dto, Member member); // id와 dto를 통해 새로운 내용으로 업데이트
}
