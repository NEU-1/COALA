package com.coala.backend.member.api.service;

import com.coala.backend.member.db.dto.request.LoginRequestDto;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.dto.response.MemberInfoResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

public interface MemberService {

    BaseResponseDto signUp(Map<String, String> member);

    BaseResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response);

    MemberInfoResponseDto loadInfo(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    BaseResponseDto updatePassword(Map<String, String> info);

    BaseResponseDto updateInfo(Map<String, String> info, HttpServletRequest request, HttpServletResponse response);

    BaseResponseDto logout();

    BaseResponseDto certification(Map<String, String> info);

    BaseResponseDto sendOTP(Map<String, String> info);
}
