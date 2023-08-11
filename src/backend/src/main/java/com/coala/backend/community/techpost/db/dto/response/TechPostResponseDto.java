package com.coala.backend.community.techpost.db.dto.response;

import com.coala.backend.community.techpost.db.entity.TechImage;
import com.coala.backend.member.db.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/*
    테크게시판 응답 DTO 입니다.
*/

@Getter
@NoArgsConstructor
public class TechPostResponseDto {
    private Long id;
    @JsonIgnore
    private Member memberId;
    private String title;
    private String detail;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private List<String> imagePath;
    @JsonIgnore
    private Member nickname;
    private boolean good;
    private int views;
    private int commentCount;
    private int goodCount;

    @Builder
    public TechPostResponseDto(Long id, Member memberId, String title, String detail, LocalDateTime createAt, LocalDateTime updateAt,
                               List<String> imagePath, Member nickname, int views, int commentCount, int goodCount, boolean good) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.detail = detail;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.nickname = nickname;
        this.imagePath = imagePath;
        this.views = views;
        this.commentCount = commentCount;
        this.goodCount = goodCount;
        this.good = good;
    }

}
