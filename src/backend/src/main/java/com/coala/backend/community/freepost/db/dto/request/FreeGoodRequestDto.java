package com.coala.backend.community.freepost.db.dto.request;

import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.entity.FreeGood;
import com.coala.backend.member.db.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreeGoodRequestDto {

    private FreePost fpId;

    @Builder
    public FreeGoodRequestDto(FreePost fpId) {
        this.fpId = fpId;
    }

    public FreeGood toEntity(Member member) {
        return FreeGood.builder()
                .memberId(member)
                .fpId(this.fpId)
                .build();
    }
}
