package com.coala.backend.community.techpost.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.community.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.member.db.entity.Member;


public interface TechPostService {
    public CommunityBaseResponseDto savePost (TechPostRequestDto PostDto, Member member);    // 요청 받은 Dto를 활용해서 post를 저장
    public CommunityBaseResponseDto getPostList(int page, Member member);    // Post 정보를 담기 위한 List
    public TechPostResponseDto getPost(Long id, Member member); // 요청 받은 게시판 id를 통해 Dto에서 정보 불러오기
    public void deletePost(Long id, Member member); // 삭제
    public CommunityBaseResponseDto searchPosts(String keyword, int page, Member member); // 키워드를 통해 검색해서 List 만들기
    public CommunityBaseResponseDto updateTechPost(Long id, TechPostRequestDto dto, Member member); // id와 dto를 통해 새로운 내용으로 업데이트
}
