package com.coala.backend.community.freepost.db.repository;

import com.coala.backend.community.freepost.db.entity.FreeComment;
import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.techpost.db.entity.TechComment;
import com.coala.backend.community.techpost.db.entity.TechPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FreeCommentRepository extends JpaRepository<FreeComment, Long> {
    List<FreeComment> findByFpId(FreePost freePost, Pageable pageable);
}
