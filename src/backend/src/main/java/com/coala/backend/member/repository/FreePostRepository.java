package com.coala.backend.db.repository;

import com.coala.backend.db.entity.FreePost;
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
}
