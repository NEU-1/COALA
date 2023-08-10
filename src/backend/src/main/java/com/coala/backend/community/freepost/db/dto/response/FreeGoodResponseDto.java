package com.coala.backend.community.freepost.db.dto.response;

import com.coala.backend.community.freepost.db.entity.FreePost;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreeGoodResponseDto {

    @JsonIgnore
    private FreePost fpId;

    @Builder
    public FreeGoodResponseDto(FreePost fpId) {
        this.fpId = fpId;
    }
}
