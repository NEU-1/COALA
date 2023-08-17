package com.coala.backend.community.techpost.db.entity;

import com.coala.backend.member.db.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
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
    @JoinColumn(name = "tp_id")
    @NotNull
    private TechPost tpId;

    @ManyToOne(targetEntity = TechPost.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    @NotNull
    private TechPost writerId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member memberId;

    @Builder
    public TechGood(TechPost tpId, TechPost writerId, Member memberId) {
        this.tpId = tpId;
        this.writerId = writerId;
        this.memberId = memberId;
    }
}
