package com.coala.backend.db.repository;

import com.coala.backend.db.entity.FreeComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeCommentRepository extends JpaRepository<FreeComment, Long> {
}
