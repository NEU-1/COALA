package com.coala.backend.auction.db.repository;

import com.coala.backend.auction.db.entity.AuctionPost;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CustomAuctionPostRepository {

    List<AuctionPost> findAllFilter(Map<String, String> info, Integer page);
}
