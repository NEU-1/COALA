package com.coala.backend.community.freepost.db.repository;

import com.coala.backend.community.freepost.db.entity.FreeImage;
import com.coala.backend.community.freepost.db.entity.FreePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FreeImageRepository extends JpaRepository<FreeImage, Long> {
    List<FreeImage> deleteByFpId(FreePost freePost);
    List<FreeImage> findByFpId(FreePost freePost);
}
