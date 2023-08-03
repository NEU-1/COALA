package com.coala.backend.freepost.db.entity;

import com.coala.backend.member.db.entity.Member;
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
- 추천 수 기능 미구현
* */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId", referencedColumnName = "email")
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

    @Column(columnDefinition = "integer default 0")
    @NotNull
    private int count;

    @OneToMany(mappedBy = "fpId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<FreeComment> comments = new ArrayList<>();

    @Builder
    public FreePost(Member memberId, String title, String detail , String imagePath, boolean isAnonymous) {
        this.memberId = memberId;
        this.title = title;
        this.detail = detail;
        this.imagePath = imagePath;
        this.isAnonymous = isAnonymous;
    }

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    public void updateFreePost(Member memberId, String title, String detail, String imagePath, boolean isAnonymous) {
        this.memberId = memberId;
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
