package com.coala.backend.community.notice.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Notice.class, fetch = FetchType.LAZY)
    @JoinColumn (name = "np_id")
    @NotNull
    private Notice npId;

    @NotNull
    @Column (name = "image_path")
    private String imagePath;

    @Builder
    public NoticeImage(Notice npId, String imagePath) {
        this.npId = npId;
        this.imagePath = imagePath;
    }
}
