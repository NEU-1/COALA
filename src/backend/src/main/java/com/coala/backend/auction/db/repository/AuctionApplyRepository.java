package com.coala.backend.auction.db.repository;

import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.auction.db.entity.AuctionPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionApplyRepository extends JpaRepository<AuctionApply, Long> {

    List<AuctionApply> findByAuctionPost(AuctionPost auctionPost);
}
