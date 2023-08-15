package com.coala.backend.store.db.entity;

import com.coala.backend.member.db.entity.Member;
import com.coala.backend.product.db.entity.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class StorePost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, columnDefinition = "varchar(255)")
    private String title;

    @Column(name = "detail", nullable = false, columnDefinition = "longtext")
    private String detail;

    @Column(name = "min_rental_period", columnDefinition = "smallint")
    @ColumnDefault("1")
    private Integer minRentalPeriod;

    @Column(name = "max_rental_period", nullable = false, columnDefinition = "smallint")
    private Integer maxRentalPeriod;

    @Column(name = "limit_date", columnDefinition = "date")
    private Date limitDate;

    @Column(name = "rental_cost", nullable = false, columnDefinition = "int")
    private Integer rentalCost;

    @Column(name = "deposit", columnDefinition = "int")
    @ColumnDefault("0")
    private Integer deposit;

    @Column(name = "views", columnDefinition = "int")
    private Integer views;

    @Column(name = "created_at", columnDefinition = "datetime", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "datetime")
    private LocalDateTime updatedAt;

    // 대기 중(1), 예약중 (0), 대여완료(-1)
    @Column(name = "status", columnDefinition = "int")
    private Integer status;

    // 작성자
    @Column(name = "author", columnDefinition = "varchar(255)")
    private String author;

    @PrePersist
    public void pre() {
        this.views = 0;
        this.status = 1;
        this.createdAt = LocalDateTime.now();
    }
    // member 연관
    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    // storeLike 연관
    @OneToMany(mappedBy = "storePost")
    @JsonIgnore
    private List<StoreLike> storeLike = new ArrayList<>();

    // category 연관
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

}