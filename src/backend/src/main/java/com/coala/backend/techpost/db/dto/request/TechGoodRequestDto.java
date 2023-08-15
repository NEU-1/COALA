package com.coala.backend.techpost.db.dto.request;

import com.coala.backend.member.db.entity.Member;
import com.coala.backend.techpost.db.entity.TechGood;
import com.coala.backend.techpost.db.entity.TechPost;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechGoodRequestDto {

    private Member memberId;
    private TechPost tpId;
    private TechPost writerId;

    @Builder
    public TechGoodRequestDto(Member memberId, TechPost tpId, TechPost writerId) {
        this.memberId = memberId;
        this.tpId = tpId;
        this.writerId = writerId;
    }

    public TechGood toEntity() {
        return TechGood.builder()
                .memberId(this.memberId)
                .tpId(this.tpId)
                .writerId(this.writerId)
                .build();
    }
}
