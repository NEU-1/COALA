package com.coala.backend.member.api.controller;

import com.coala.backend.member.api.service.MemberService;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.dto.request.LoginRequestDto;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.dto.response.MemberInfoResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    private final JwtTokenProvider jwtTokenProvider;

    public MemberController(MemberService memberService, JwtTokenProvider jwtTokenProvider) {
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseDto> signUp(@RequestBody Map<String, String> member) {
        BaseResponseDto response = memberService.signUp(member);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<? extends BaseResponseDto> login(@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse) {
        // Header 에 토큰 값을 넣기 위해 HttpServletResponse 사용
        BaseResponseDto response = memberService.login(loginRequestDto, httpServletResponse);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/info")
    public MemberInfoResponseDto loadInfo(HttpServletRequest request) {
        return memberService.loadInfo(jwtTokenProvider.getMail(request));
    }

    // 변경 가능한 값 : 닉네임, 암호
    @PutMapping("/update-info")
    public ResponseEntity<? extends BaseResponseDto> updateInfo(@RequestBody Map<String, String> info, HttpServletRequest request) {
        BaseResponseDto response = memberService.updateInfo(info, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<? extends BaseResponseDto> logout() {
        BaseResponseDto response = memberService.logout();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // 회원가입 인증메일 전송
    @PostMapping("/email-certification")
    public ResponseEntity<? extends BaseResponseDto> signUpCertification(@RequestBody Map<String, String> info) {
        BaseResponseDto response = memberService.sendOTP(info);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // 비밀번호 찾기 메일 전송
    @PostMapping("/findpassword")
    public ResponseEntity<? extends BaseResponseDto> findPassword(@RequestBody Map<String, String> info) {
        BaseResponseDto response = memberService.sendOTP(info);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // 인증번호 확인
    @PostMapping("/certification")
    public ResponseEntity<? extends BaseResponseDto> certification(@RequestBody Map<String, String> info) {
        BaseResponseDto response = memberService.certification(info);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // 비밀번호 변경하기(추후 수정이 필요할수도)
    @PutMapping("/updatepassword")
    public ResponseEntity<? extends BaseResponseDto> updatePassword(@RequestBody Map<String, String> info) {
        BaseResponseDto response = memberService.updatePassword(info);

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}