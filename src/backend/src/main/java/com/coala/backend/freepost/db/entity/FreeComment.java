package com.coala.backend.freepost.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class FreeComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = FreePost.class, fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "fp_id")
    @NotNull
    private FreePost fpId;

    @NotNull
    private String author;

    @NotNull
    private String content;

    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;
    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    @Builder
    public FreeComment(FreePost fpId, String author, String content) {
        this.fpId = fpId;
        this.author = author;
        this.content = content;
    }

    public void FreeCommentUpdate(String author, String content) {
        this.author = author;
        this.content = content;
        this.updateAt = LocalDateTime.now();
    }
}
