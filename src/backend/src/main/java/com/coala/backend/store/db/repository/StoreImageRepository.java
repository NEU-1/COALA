package com.coala.backend.store.db.repository;

import com.coala.backend.store.db.entity.StoreImage;
import com.coala.backend.store.db.entity.StorePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreImageRepository extends JpaRepository<StoreImage, Long> {

    List<StoreImage> findByStorePost(StorePost storePost);
}
