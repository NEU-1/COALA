package com.coala.backend.community.techpost.db.dto.request;

import com.coala.backend.community.techpost.db.entity.TechGood;
import com.coala.backend.community.techpost.db.entity.TechPost;
import com.coala.backend.member.db.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechGoodRequestDto {

    private TechPost tpId;
    @JsonIgnore
    private Member memberId;

    @Builder
    public TechGoodRequestDto(TechPost tpId, Member memberId) {
        this.tpId = tpId;
        this.memberId = memberId;
    }

    public TechGood toEntity(Member member) {
        return TechGood.builder()
                .memberId(member)
                .tpId(this.tpId)
                .build();
    }
}
