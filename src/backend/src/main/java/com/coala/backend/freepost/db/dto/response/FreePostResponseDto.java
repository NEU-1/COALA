package com.coala.backend.freepost.db.dto.response;

import com.coala.backend.member.db.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
    자유게시판 응답 DTO 입니다.
*/

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FreePostResponseDto {
    private Long id;
    private Member memberId;
    private String title;
    private String detail;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String imagePath;
    private boolean isAnonymous;
    private int views;
    private int commentCount;
    private int goodCount;

    @Builder
    public FreePostResponseDto(Member memberId, String title, String detail,
                               LocalDateTime createAt, LocalDateTime updateAt, String imagePath,
                               boolean isAnonymous, int views, int commentCount, int goodCount) {
        this.memberId = memberId;
        this.title = title;
        this.detail = detail;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.imagePath = imagePath;
        this.isAnonymous = isAnonymous;
        this.views = views;
        this.commentCount = commentCount;
        this.goodCount = goodCount;
    }
}
