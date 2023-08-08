package com.coala.backend.community.freepost.db.repository;

import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.entity.FreeGood;
import com.coala.backend.member.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FreeGoodRepository extends JpaRepository<FreeGood, Long> {
    Optional<FreeGood> findByMemberIdAndFpId(Member member, FreePost freePost);
    void deleteByFpId(FreePost freePost);
    List<FreeGood> findByFpId(FreePost freePost);

}
