package com.coala.backend.community.techpost.db.dto.request;

import com.coala.backend.community.techpost.db.entity.TechGood;
import com.coala.backend.community.techpost.db.entity.TechPost;
import com.coala.backend.member.db.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechGoodRequestDto {

    private TechPost tpId;

    @Builder
    public TechGoodRequestDto(TechPost tpId) {
        this.tpId = tpId;
    }

    public TechGood toEntity(Member member) {
        return TechGood.builder()
                .memberId(member)
                .tpId(this.tpId)
                .build();
    }
}
