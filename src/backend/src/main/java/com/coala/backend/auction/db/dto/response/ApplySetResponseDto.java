package com.coala.backend.auction.db.dto.response;

import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class ApplySetResponseDto {

    private BaseResponseDto baseResponseDto;

    private AuctionApply auctionApply;

    public ApplySetResponseDto(BaseResponseDto baseResponseDto) {
        this.baseResponseDto = baseResponseDto;
    }
}
