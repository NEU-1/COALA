package com.coala.backend.auction.db.repository;

import com.coala.backend.auction.db.entity.AuctionPost;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Transactional
public class CustomAuctionPostRepositoryImpl implements CustomAuctionPostRepository {


    EntityManager entityManager;

    public CustomAuctionPostRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<AuctionPost> findAllFilter(Map<String, String> info, Integer page) {
        StringBuilder sb = new StringBuilder();
        sb.append("select a from AuctionPost a");

        if(info.get("category").equals("") &&  info.get("minRentalPeriod").equals("") && !info.get("status").equals("1")){
            System.out.println(sb);
            return entityManager.createQuery(sb.toString(), AuctionPost.class).setFirstResult(page * 10).setMaxResults(10).getResultList();
        }

        sb.append(" where ");

        String and = " and ";

        int plus = 0;

        // 분류(코드로 분류)
        if(!info.get("category").equals("")){
            sb.append("a.category like ").append(info.get("category"));
            plus++;
        }

        // 대여기간(필터 최소 대여 기간 기준)
        if(!info.get("minRentalPeriod").equals("")){
            if(plus != 0){
                sb.append(and);
            }
            sb.append("a.minRentalPeriod >= ").append(info.get("minRentalPeriod"));
            plus++;
        }

        if(info.get("status").equals("1")){
            if(plus != 0){
                sb.append(and);
            }
            sb.append("a.status like 1");
        }


        System.out.println(sb);
        List<AuctionPost> list = entityManager.createQuery(sb.toString(),AuctionPost.class).setFirstResult(page * 10).setMaxResults(10).getResultList();
        return list;
    }
}
