package com.coala.backend.freepost.db.dto.request;

import com.coala.backend.freepost.db.entity.FreeGood;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.member.db.entity.Member;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreeGoodRequestDto {

    private FreePost fpId;
    private FreePost writerId;

    @Builder
    public FreeGoodRequestDto(FreePost fpId, FreePost writerId) {
        this.fpId = fpId;
        this.writerId = writerId;
    }

    public FreeGood toEntity(Member member) {
        return FreeGood.builder()
                .memberId(member)
                .fpId(this.fpId)
                .writerId(this.writerId)
                .build();
    }
}
