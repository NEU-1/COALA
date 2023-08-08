package com.coala.backend.auction.db.repository;

import com.coala.backend.auction.db.entity.AuctionPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionPostRepository extends JpaRepository<AuctionPost, Long> {

}
