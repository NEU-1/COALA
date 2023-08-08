package com.coala.backend.auction.db.dto.response;

import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.auction.db.entity.AuctionPost;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.product.db.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostResponseDto {

    // 게시글 정보
    private AuctionPost auctionPost;

    private List<AuctionApply> auctionApplies;

    private Category category;

    // 응답 정보
    private BaseResponseDto baseResponseDto;
}
