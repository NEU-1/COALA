package com.coala.backend.community.techpost.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.community.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.member.db.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TechPostService {
    public CommunityBaseResponseDto savePost (List<MultipartFile> image, TechPostRequestDto PostDto, Member member) throws IOException;    // 요청 받은 Dto를 활용해서 post를 저장
    public CommunityBaseResponseDto getPostList(int page);    // Post 정보를 담기 위한 List
    public TechPostResponseDto getPost(Long id, Member member); // 요청 받은 게시판 id를 통해 Dto에서 정보 불러오기
    public void deletePost(Long id, Member member); // 삭제
    public CommunityBaseResponseDto searchPosts(String keyword, int page); // 키워드를 통해 검색해서 List 만들기
    public CommunityBaseResponseDto updateTechPost(List<MultipartFile> image, Long id, TechPostRequestDto dto, Member member) throws IOException; // id와 dto를 통해 새로운 내용으로 업데이트
}
