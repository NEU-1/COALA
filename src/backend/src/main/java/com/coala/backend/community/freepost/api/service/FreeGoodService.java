package com.coala.backend.community.freepost.api.service;

import com.coala.backend.community.freepost.db.dto.request.FreeGoodRequestDto;
import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.member.db.entity.Member;

public interface FreeGoodService {
    public BasePostResponseDto good(FreeGoodRequestDto freeGoodRequestDto, Member member);
    public BasePostResponseDto unGood(FreeGoodRequestDto freeGoodRequestDto, Member member);
}
