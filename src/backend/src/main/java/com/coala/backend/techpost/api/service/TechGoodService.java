package com.coala.backend.techpost.api.service;


import com.coala.backend.freepost.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.techpost.db.dto.request.TechGoodRequestDto;

public interface TechGoodService {
    public BaseResponseDto good(TechGoodRequestDto techGoodRequestDto, Member member);
    public BaseResponseDto unGood(TechGoodRequestDto techGoodRequestDto, Member member);
}
