package com.coala.backend.auction.db.repository;

import com.coala.backend.auction.db.entity.AuctionPost;
import com.coala.backend.member.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionPostRepository extends JpaRepository<AuctionPost, Long> {

    List<AuctionPost> findByMember(Member member);
}
