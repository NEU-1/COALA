package com.coala.backend.community.notice.db.repository;

import com.coala.backend.community.notice.db.entity.Notice;
import com.coala.backend.community.notice.db.entity.NoticeImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeImageRepository extends JpaRepository<NoticeImage, Long> {
    List<NoticeImage> findByNpId(Notice notice);
    List<NoticeImage> deleteByNpId(Notice notice);
}