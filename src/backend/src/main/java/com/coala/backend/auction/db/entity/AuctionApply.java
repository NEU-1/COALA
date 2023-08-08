package com.coala.backend.auction.db.entity;

import com.coala.backend.member.db.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class AuctionApply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonIgnore
    private AuctionPost auctionPost;

    @Column(name="created_at", columnDefinition = "datetime")
    private LocalDateTime createdAt;

    @PrePersist
    public void createAt(){
        this.createdAt = LocalDateTime.now();
    }

    @Column(name = "title", nullable = false, columnDefinition = "varchar(255)")
    private String title;

    @Column(name = "detail",nullable = false, columnDefinition = "longtext")
    private String detail;

    @Column(name = "deposit", columnDefinition = "int")
    private Integer deposit;

    @Column(name = "rentalCost", nullable = false, columnDefinition = "int")
    private Integer rentalCost;

    // 흥정가능 여부(1 : 가능, 0 :불가)
    @Column(name = "negotiation", nullable = false, columnDefinition = "int")
    private Integer negotiation;
}


