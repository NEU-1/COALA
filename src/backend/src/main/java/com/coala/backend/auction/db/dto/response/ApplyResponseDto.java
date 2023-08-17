package com.coala.backend.auction.db.dto.response;

import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.auction.db.entity.AuctionImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplyResponseDto {
    private AuctionApply auctionApply;
    private Long memberId;
    private List<AuctionImage> auctionImageList;
    private String url;
}
