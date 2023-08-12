package com.coala.backend.community.techpost.db.repository;

import com.coala.backend.community.techpost.db.entity.TechImage;
import com.coala.backend.community.techpost.db.entity.TechPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TechImageRepository extends JpaRepository<TechImage, Long> {
    List<TechImage> findByTpId(TechPost techPost);
    List<TechImage> deleteByTpId(TechPost techPost);
}