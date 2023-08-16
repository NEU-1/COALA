package com.coala.backend.community.techpost.db.entity;

import com.coala.backend.member.db.entity.Member;
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
public class TechComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = TechPost.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "tp_id")
    @NotNull
    private TechPost tpId;

    @NotNull
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "member_id")
    private Member memberId;

    @NotNull
    @Column(name = "is_anonymous")
    private boolean isAnonymous;

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
    public TechComment(TechPost tpId, boolean isAnonymous, String content, Member memberId) {
        this.tpId = tpId;
        this.isAnonymous = isAnonymous;
        this.memberId = memberId;
        this.content = content;
    }

    public void updateTechComment(boolean isAnonymous, String content) {
        this.isAnonymous = isAnonymous;
        this.content = content;
        this.updateAt = LocalDateTime.now();
    }
}
