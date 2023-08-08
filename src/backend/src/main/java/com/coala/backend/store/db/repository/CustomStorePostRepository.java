package com.coala.backend.store.db.repository;

import com.coala.backend.store.db.entity.StorePost;

import java.util.List;
import java.util.Map;

public interface CustomStorePostRepository {

    List<StorePost> findAllFilter(Map<String, String> info, Integer page);
}
