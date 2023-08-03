package com.coala.backend.techpost.db.entity;

import com.coala.backend.member.db.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
- 추천 수 기능 미구현
* */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private Member userId;

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

    @ManyToOne
    @JoinColumn(name = "nickname")
    private Member nickname;

    @Column(columnDefinition = "integer default 0")
    @NotNull
    private int views;

    @Column(columnDefinition = "integer default 0")
    @NotNull
    private int count;

    @Builder
    public TechPost(Member userId, String title, String detail , String imagePath, Member nickname) {
        this.userId = userId;
        this.title = title;
        this.detail = detail;
        this.imagePath = imagePath;
        this.nickname = nickname;
    }

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    public void updateTechPost(Member userId, String title, String detail, String imagePath, Member nickname) {
        this.userId = userId;
        this.title = title;
        this.detail = detail;
        this.updateAt = LocalDateTime.now();
        this.imagePath = imagePath;
        this.nickname = nickname;
    }

    public void views() {
        this.views++;
    }
}
