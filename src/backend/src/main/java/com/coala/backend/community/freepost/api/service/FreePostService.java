package com.coala.backend.community.freepost.api.service;

import com.coala.backend.community.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.freepost.db.dto.response.FreePostResponseDto;
import com.coala.backend.member.db.entity.Member;

public interface FreePostService {
    public CommunityBaseResponseDto savePost (FreePostRequestDto PostDto, Member member);    // 요청 받은 Dto를 활용해서 post를 저장
    public CommunityBaseResponseDto getPostList(int page, Member member);    // Board 정보를 담기 위한 List
    public FreePostResponseDto getPost(Long id, Member member); // 요청 받은 게시판 id를 통해 Dto에서 정보 불러오기
    public void deletePost(Long id, Member member); // 게시글 삭제
    public CommunityBaseResponseDto searchPosts(String keyword, int page, Member member); // 키워드를 통해 검색해서 List 만들기
    public CommunityBaseResponseDto updateFreePost(Long id, FreePostRequestDto dto, Member member); // id와 dto를 통해 새로운 내용으로 업데이트
}
