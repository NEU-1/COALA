package com.coala.backend.techpost.db.repository;

import com.coala.backend.techpost.db.entity.TechComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechCommentRepository extends JpaRepository<TechComment, Long> {
}
