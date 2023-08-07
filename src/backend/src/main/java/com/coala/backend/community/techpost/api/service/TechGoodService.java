package com.coala.backend.community.techpost.api.service;


import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechGoodRequestDto;
import com.coala.backend.member.db.entity.Member;

public interface TechGoodService {
    public BasePostResponseDto good(TechGoodRequestDto techGoodRequestDto, Member member);
    public BasePostResponseDto unGood(TechGoodRequestDto techGoodRequestDto, Member member);
}
