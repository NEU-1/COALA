package com.coala.backend.community.techpost.db.repository;

import com.coala.backend.community.techpost.db.entity.TechPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
* 테크 게시판 Repository 입니다.
* */
public interface TechPostRepository extends JpaRepository<TechPost, Long> {
    List<TechPost> findByTitleContaining(String keyword, Pageable pageable);
    List<TechPost> findByTitleContaining(String keyword);
}
