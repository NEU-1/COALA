package com.coala.backend.mypage.db.repository;

import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.store.db.entity.StorePost;
import com.coala.backend.store.db.repository.StorePostRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class CustomMyPageRepository  {

    private EntityManager entityManager;

    private MemberRepository memberRepository;

    private StorePostRepository storePostRepository;

    public CustomMyPageRepository(EntityManager entityManager, MemberRepository memberRepository, StorePostRepository storePostRepository) {
        this.entityManager = entityManager;
        this.memberRepository = memberRepository;
        this.storePostRepository = storePostRepository;
    }

    public List<?> findAllId(Long id, String Object) {
        String sql = "select a from " + Object + " a where a.member_id = " + id;
        return entityManager.createQuery(sql).getResultList();
    }

    public List<StorePost> findStoreId(Long id){
        return storePostRepository.findByMember(memberRepository.findById(id).get());
    }

    public List<StorePost> findByFavorite(Long id){
        String sql = "select * from StorePost where member_id = " + id + " and id in(select post_id from StoreLike where member_id" + id +")";
        return entityManager.createQuery(sql).getResultList();
    }
}
