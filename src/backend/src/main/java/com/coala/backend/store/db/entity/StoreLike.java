package com.coala.backend.store.db.entity;

import com.coala.backend.member.db.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class StoreLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;


    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private StorePost storePost;

    @Column(name="created_at", columnDefinition = "datetime")
    private LocalDateTime createdAt;

    @PrePersist
    public void createAt(){
        this.createdAt = LocalDateTime.now();
    }
}
