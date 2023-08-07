package com.coala.backend.freepost.db.repository;

import com.coala.backend.freepost.db.entity.FreeComment;
import com.coala.backend.freepost.db.entity.FreePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FreeCommentRepository extends JpaRepository<FreeComment, Long> {
}
