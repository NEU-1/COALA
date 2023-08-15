package com.coala.backend.auction.db.dto.response;

import com.coala.backend.auction.db.entity.AuctionApply;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplyResponseDto {
    private AuctionApply auctionApply;
    private Long memberId;
}
