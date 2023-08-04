package com.coala.backend.freepost.db.repository;

import com.coala.backend.freepost.db.entity.FreeComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeCommentRepository extends JpaRepository<FreeComment, Long> {
}
