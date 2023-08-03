package com.coala.backend.notice.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
- 공지 게시판
* */

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Builder
    public Notice(String title, String detail , String imagePath) {
        this.title = title;
        this.detail = detail;
        this.imagePath = imagePath;
    }

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    public void updateFreePost(String title, String detail, String imagePath) {
        this.title = title;
        this.detail = detail;
        this.updateAt = LocalDateTime.now();
        this.imagePath = imagePath;
    }
}
