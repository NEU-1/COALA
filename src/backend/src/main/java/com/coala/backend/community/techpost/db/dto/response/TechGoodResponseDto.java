package com.coala.backend.community.techpost.db.dto.response;

import com.coala.backend.community.techpost.db.entity.TechPost;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechGoodResponseDto {

    private TechPost tpId;

    @Builder
    public TechGoodResponseDto(TechPost tpId) {
        this.tpId = tpId;
    }
}
