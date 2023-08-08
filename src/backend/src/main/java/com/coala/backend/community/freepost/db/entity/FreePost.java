package com.coala.backend.community.freepost.db.entity;

import com.coala.backend.member.db.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/*
- 자유게시판 Entity 입니다.
* */

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member memberId;

    @NotNull
    private String title;

    @Lob
    @NotNull
    private String detail;

    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;
    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "image_path")
    private String imagePath;

    @NotNull
    @Column(name = "is_anonymous")
    private boolean isAnonymous;

    @Column(columnDefinition = "integer default 0")
    @NotNull
    private int views;

    @Column
    @NotNull
    private int commentCount;

    @Column
    @NotNull
    private int goodCount;

    @OneToMany(mappedBy = "fpId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<FreeGood> goods = new ArrayList<>();

    @OneToMany(mappedBy = "fpId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<FreeComment> comments = new ArrayList<>();

    @Builder
    public FreePost(Member memberId, String title, String detail , String imagePath, boolean isAnonymous) {
        this.memberId = memberId;
        this.title = title;
        this.detail = detail;
        this.imagePath = imagePath;
        this.isAnonymous = isAnonymous;
        this.commentCount = this.getComments().size();
        this.goodCount = this.getGoods().size();
    }

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    public void updateFreePost(String title, String detail, String imagePath, boolean isAnonymous) {
        this.title = title;
        this.detail = detail;
        this.updateAt = LocalDateTime.now();
        this.imagePath = imagePath;
        this. isAnonymous = isAnonymous;
    }

    public void views() {
        this.views++;
    }
}
