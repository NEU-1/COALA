package com.coala.backend.product.db.entity;


import com.coala.backend.member.db.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class MyProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, columnDefinition = "varchar(255)")
    private String title;

    @Column(name = "detail", nullable = false, columnDefinition = "longtext")
    private String detail;

    // 대기중(1), 예약중(0), 거래완료(-1) => 다시 1로 돌리는 버튼도 생성 필요
    @Column(name = "status", columnDefinition = "int")
    private Integer status;

    // 기본 상태값
    @PrePersist
    public void status(){
        this.status = 0;
    }

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

}
