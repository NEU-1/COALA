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

    private TechPost tpId;
    private TechPost writerId;

    @Builder
    public TechGoodRequestDto(TechPost tpId, TechPost writerId) {
        this.tpId = tpId;
        this.writerId = writerId;
    }

    public TechGood toEntity(Member member) {
        return TechGood.builder()
                .memberId(member)
                .tpId(this.tpId)
                .writerId(this.writerId)
                .build();
    }
}
