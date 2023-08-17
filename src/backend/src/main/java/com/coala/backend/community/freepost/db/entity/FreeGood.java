package com.coala.backend.community.freepost.db.entity;

import com.coala.backend.member.db.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreeGood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = FreePost.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "fp_id")
    @NotNull
    private FreePost fpId;

    @ManyToOne(targetEntity = FreePost.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    @NotNull
    private FreePost writerId;

    @JsonIgnore
    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member memberId;

    @Builder
    public FreeGood(FreePost fpId, FreePost writerId, Member memberId) {
        this.fpId = fpId;
        this.writerId = writerId;
        this.memberId = memberId;
    }
}
