package com.coala.backend.techpost.api.controller;

import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.techpost.api.service.TechGoodServiceImpl;
import com.coala.backend.techpost.db.dto.request.TechGoodRequestDto;
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

        techGoodService.good(techGoodRequestDto, getEmail(httpServletRequest));
        return ResponseEntity.ok()
                .header("200", "성공")
                .build();
    }

    @DeleteMapping("un/good")
    public ResponseEntity unGood(@RequestBody @Valid TechGoodRequestDto techGoodRequestDto, HttpServletRequest httpServletRequest) {
        techGoodService.unGood(techGoodRequestDto, getEmail(httpServletRequest));
        return ResponseEntity.ok()
                .header("200", "성공")
                .build();
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
