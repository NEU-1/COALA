package com.coala.backend.community.freepost.api.service;

import com.coala.backend.community.freepost.db.dto.request.FreeGoodRequestDto;
import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.member.db.entity.Member;

public interface FreeGoodService {
    public CommunityBaseResponseDto good(FreeGoodRequestDto freeGoodRequestDto, Member member);
    public CommunityBaseResponseDto unGood(FreeGoodRequestDto freeGoodRequestDto, Member member);
}
