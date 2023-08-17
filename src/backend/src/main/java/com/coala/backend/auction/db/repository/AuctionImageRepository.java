package com.coala.backend.auction.db.repository;

import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.auction.db.entity.AuctionImage;
import com.coala.backend.store.db.entity.StoreImage;
import com.coala.backend.store.db.entity.StorePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AuctionImageRepository extends JpaRepository<AuctionImage, Long> {

    List<AuctionImage> findByAuctionApply(AuctionApply auctionApply);
}
