package com.coala.backend.community.techpost.api.service;


import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechGoodRequestDto;
import com.coala.backend.member.db.entity.Member;

public interface TechGoodService {
    public CommunityBaseResponseDto good(TechGoodRequestDto techGoodRequestDto, Member member);
    public CommunityBaseResponseDto unGood(TechGoodRequestDto techGoodRequestDto, Member member);
}
