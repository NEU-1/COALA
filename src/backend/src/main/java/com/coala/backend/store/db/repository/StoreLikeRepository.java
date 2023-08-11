package com.coala.backend.store.db.repository;

import com.coala.backend.member.db.entity.Member;
import com.coala.backend.store.db.entity.StoreLike;
import com.coala.backend.store.db.entity.StorePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoreLikeRepository extends JpaRepository<StoreLike, Long> {

     Optional<StoreLike> findByMemberAndStorePost(Member member, StorePost storePost);

     List<StoreLike> findByStorePost(StorePost storePost);
}
