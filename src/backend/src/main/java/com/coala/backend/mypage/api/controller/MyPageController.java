package com.coala.backend.mypage.api.controller;


import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.mypage.api.service.MyPageService;
import com.coala.backend.mypage.api.service.ProfileImageService;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/mypage")

public class MyPageController {
    private Logger logger = LoggerFactory.getLogger(MyPageController.class);
    private JwtTokenProvider jwtTokenProvider;
    private MyPageService myPageService;
    private MemberRepository memberRepository;
    private ProfileImageService profileImageService;

    public MyPageController(JwtTokenProvider jwtTokenProvider, MyPageService myPageService, MemberRepository memberRepository, ProfileImageService profileImageService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.myPageService = myPageService;
        this.memberRepository = memberRepository;
        this.profileImageService = profileImageService;
    }

    @PostMapping("/store")
    public ListResponseDto myStore(HttpServletRequest request){
        Member member = getMember(request);
        logger.info("내가 쓴 글(제공자) : {} ", member.getEmail());

        ListResponseDto response = myPageService.myStore(member);

        return response;
    }

    @PostMapping ("/auction")
    public ListResponseDto myAuction(HttpServletRequest request){
        Member member = getMember(request);
        logger.info("내가 쓴 글(이용자) : {} ", member.getEmail());

        ListResponseDto response = myPageService.myAuction(member);

        return response;
    }

    @PostMapping("/favorite")
    public ListResponseDto myFavorite(HttpServletRequest request){
        Member member = getMember(request);
        logger.info("내 관심 목록 : {} ", member.getEmail());

        ListResponseDto response = myPageService.myFavorite(member);
        return response;
    }

    @PostMapping ("/tech")
    public ListResponseDto myTech(HttpServletRequest request){
        Member member = getMember(request);
        logger.info("내가 쓴 글(이용자) : {} ", member.getEmail());
        ListResponseDto response = myPageService.myTech(member);
        return response;
    }

    @PostMapping ("/free")
    public ListResponseDto myFree(HttpServletRequest request){
        Member member = getMember(request);
        logger.info("내가 쓴 글(이용자) : {} ", member.getEmail());
        ListResponseDto response = myPageService.myFree(member);
        return response;
    }

    @PostMapping("/profile")
    public ResponseEntity<? extends BaseResponseDto> myProfile(@RequestPart("multipartFile")MultipartFile file, HttpServletRequest request) throws Exception{
        Member member = getMember(request);
        logger.info("프로필 수정 : {}", member.getEmail());
        BaseResponseDto response = profileImageService.file(file, member);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    public Member getMember(HttpServletRequest request){
        Member member = memberRepository.findByEmail(jwtTokenProvider.getMail(request))
                .orElseThrow(() -> new NoSuchElementException("No User"));
        logger.info("User Email : {} ", member.getEmail());
        return member;
    }
}
