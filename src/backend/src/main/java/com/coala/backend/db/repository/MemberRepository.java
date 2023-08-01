package com.coala.backend.db.repository;

import com.coala.backend.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/*
    Certification Member
 */
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
}
