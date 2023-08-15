package com.coala.backend.community.freepost.db.repository;

import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.techpost.db.entity.TechPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
    자유게시판 Repository 입니다.
*/

@Repository
public interface FreePostRepository extends JpaRepository<FreePost, Long> {
    List<FreePost> findByTitleContaining(String keyword, Pageable pageable);
    List<FreePost> findByTitleContaining(String keyword);
}

