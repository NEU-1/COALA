package com.coala.backend.techpost.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = TechPost.class, fetch = FetchType.LAZY)
    @JoinColumn (name = "fp_id")
    @NotNull
    private TechPost tpId;

    @NotNull
    @Column (name = "image_path")
    private String imagePath;

    @Builder
    public TechImage(TechPost tpId, String imagePath) {
        this.tpId = tpId;
        this.imagePath = imagePath;
    }
}
