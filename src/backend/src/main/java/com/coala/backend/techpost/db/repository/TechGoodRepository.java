package com.coala.backend.techpost.db.repository;

import com.coala.backend.member.db.entity.Member;
import com.coala.backend.techpost.db.entity.TechGood;
import com.coala.backend.techpost.db.entity.TechPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechGoodRepository extends JpaRepository<TechGood, Long> {
    Optional<TechGood> findByMemberIdAndTpId(Member member, TechPost techPost);
    void deleteByTpId(TechPost techPost);

}
