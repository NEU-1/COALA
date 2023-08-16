package com.coala.backend.community.notice.db.repository;

import com.coala.backend.community.notice.db.entity.Notice;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
    자유게시판 Repository 입니다.
*/

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findByTitleContaining(String keyword, Pageable pageable);
}
