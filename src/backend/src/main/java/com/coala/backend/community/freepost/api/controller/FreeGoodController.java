package com.coala.backend.community.freepost.api.controller;

import com.coala.backend.community.freepost.api.service.FreeGoodService;
import com.coala.backend.community.freepost.db.dto.request.FreeGoodRequestDto;
import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
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
@RequestMapping("/api/free/post/")
public class FreeGoodController {
    private final FreeGoodService freeGoodService;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    @PostMapping("is/good")
    public ResponseEntity good(@RequestBody @Valid FreeGoodRequestDto freegoodRequestDto, HttpServletRequest httpServletRequest) {

        CommunityBaseResponseDto baseResponseDto = freeGoodService.good(freegoodRequestDto, getEmail(httpServletRequest));
        return ResponseEntity.status(baseResponseDto.getStatusCode())
                .body(baseResponseDto);
    }

    @DeleteMapping("un/good")
    public ResponseEntity unGood(@RequestBody @Valid FreeGoodRequestDto freeGoodRequestDto, HttpServletRequest httpServletRequest) {
        CommunityBaseResponseDto baseResponseDto = freeGoodService.unGood(freeGoodRequestDto, getEmail(httpServletRequest));
        return ResponseEntity.status(baseResponseDto.getStatusCode())
                .body(baseResponseDto);
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
