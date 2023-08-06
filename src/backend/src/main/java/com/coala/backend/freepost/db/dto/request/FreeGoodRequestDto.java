package com.coala.backend.freepost.db.dto.request;

import com.coala.backend.freepost.db.entity.FreeGood;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.member.db.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreeGoodRequestDto {

    private Member memberId;
    private FreePost fpId;
    private FreePost writerId;

    @Builder
    public FreeGoodRequestDto(Member memberId, FreePost fpId, FreePost writerId) {
        this.memberId = memberId;
        this.fpId = fpId;
        this.writerId = writerId;
    }

    public FreeGood toEntity() {
        return FreeGood.builder()
                .memberId(this.memberId)
                .fpId(this.fpId)
                .writerId(this.writerId)
                .build();
    }
}
