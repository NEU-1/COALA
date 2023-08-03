package com.coala.backend.techpost.db.entity;

import com.coala.backend.member.db.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechGood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = TechPost.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "fp_id")
    @NotNull
    private TechPost fpId;

    @ManyToOne(targetEntity = TechPost.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    @NotNull
    private TechPost writerId;

    @ManyToOne(targetEntity = TechPost.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @NotNull
    private Member userId;

    @Column(columnDefinition = "integer default 0", name = "is_good")
    private int isGood;
}
