package com.coala.backend.community.freepost.db.dto.response;

import com.coala.backend.community.freepost.db.entity.FreePost;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreeGoodResponseDto {

    private FreePost fpId;

    @Builder
    public FreeGoodResponseDto(FreePost fpId) {
        this.fpId = fpId;
    }
}
