package com.coala.backend.community.techpost.db.repository;

import com.coala.backend.community.techpost.db.entity.TechComment;
import com.coala.backend.community.techpost.db.entity.TechPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TechCommentRepository extends JpaRepository<TechComment, Long> {
    List<TechComment> findByTpId(TechPost techPost, Pageable pageable);
}
