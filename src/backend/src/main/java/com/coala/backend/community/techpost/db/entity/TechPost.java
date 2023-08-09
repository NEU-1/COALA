package com.coala.backend.community.techpost.db.entity;

import com.coala.backend.member.db.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/*
- 테크 게시판 Entity 입니다.
* */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member memberId;

    @NotNull
    private String title;

    @Lob
    @NotNull
    private String detail;

    @Column(updatable = false, name = "create_at")
    private LocalDateTime createAt;
    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "nickname", referencedColumnName = "nickname")
    private Member nickname;

    @Column(columnDefinition = "integer default 0")
    @NotNull
    private int views;

    @OneToMany(mappedBy = "tpId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<TechGood> goods = new ArrayList<>();

    @OneToMany(mappedBy = "tpId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<TechComment> comments = new ArrayList<>();

    @Builder
    public TechPost(Member memberId, String title, String detail , Member nickname) {
        this.memberId = memberId;
        this.title = title;
        this.detail = detail;
        this.nickname = nickname;
    }

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    public void updateTechPost(String title, String detail, Member nickname) {
        this.title = title;
        this.detail = detail;
        this.updateAt = LocalDateTime.now();
        this.nickname = nickname;
    }

    public void views() {
        this.views++;
    }
}
