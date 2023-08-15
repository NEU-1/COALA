package com.coala.backend.techpost.db.dto.response;

import com.coala.backend.member.db.entity.Member;
import com.coala.backend.techpost.db.entity.TechPost;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechGoodResponseDto {

    private Member memberId;
    private TechPost tpId;
    private TechPost writerId;

    @Builder
    public TechGoodResponseDto(Member memberId, TechPost tpId, TechPost writerId) {
        this.memberId = memberId;
        this.tpId = tpId;
        this.writerId = writerId;
    }
}
