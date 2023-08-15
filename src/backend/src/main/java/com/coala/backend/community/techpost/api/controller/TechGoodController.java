package com.coala.backend.community.techpost.api.controller;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechGoodRequestDto;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.community.techpost.api.service.TechGoodServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/tech/post/")
public class TechGoodController {
    private final TechGoodServiceImpl techGoodService;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    @PostMapping("is/good")
    public ResponseEntity good(@RequestBody @Valid TechGoodRequestDto techGoodRequestDto, HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto responseDto = techGoodService.good(techGoodRequestDto, getEmail(httpServletRequest));
        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    @DeleteMapping("un/good")
    public ResponseEntity unGood(@RequestBody @Valid TechGoodRequestDto techGoodRequestDto, HttpServletRequest httpServletRequest) {
        CommunityBaseResponseDto responseDto = techGoodService.unGood(techGoodRequestDto, getEmail(httpServletRequest));
        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    public Member getEmail(HttpServletRequest httpServletRequest) {
        accessToken = jwtTokenProvider.getHeaderToken(httpServletRequest, "Access");
        String email = jwtTokenProvider.getEmailFromToken(accessToken);

        Member member = memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("작성자 ID가 존재하지 않습니다.");
        });;

        return member;
    }
}
