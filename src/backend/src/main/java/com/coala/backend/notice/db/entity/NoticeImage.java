package com.coala.backend.notice.db.entity;

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

    @ManyToOne(targetEntity = Notice.class, fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn (name = "fp_id")
    @NotNull
    private Notice fpId;

    @NotNull
    @Column (name = "image_path")
    private String imagePath;

    @Builder
    public NoticeImage(Notice fpId, String imagePath) {
        this.fpId = fpId;
        this.imagePath = imagePath;
    }
}
