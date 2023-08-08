package com.coala.backend.store.db.repository;

import com.coala.backend.store.db.entity.StorePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorePostRepository extends JpaRepository<StorePost, Long> {


}
