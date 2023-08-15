package com.coala.backend.community.techpost.db.dto.response;

import com.coala.backend.member.db.entity.Member;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/*
    테크게시판 응답 DTO 입니다.
*/
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor
public class TechPostResponseDto {
    private Long id;
    private Member memberId;
    private String title;
    private String detail;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String imagePath;
    private String nickname;
    private boolean good;
    private boolean mine;
    private int views;
    private int commentCount;
    private int goodCount;

    @Builder
    public TechPostResponseDto(Long id, Member memberId, String title, String detail, LocalDateTime createAt, LocalDateTime updateAt,
                               String imagePath, String nickname, int views, int commentCount, int goodCount, boolean good, boolean mine) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.detail = detail;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.nickname = nickname;
        this.mine = mine;
        this.imagePath = imagePath;
        this.views = views;
        this.commentCount = commentCount;
        this.goodCount = goodCount;
        this.good = good;
    }

}
