package com.coala.backend.freepost.db.dto.request;

import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.member.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
    자유 게시판 요청 Dto 입니다.
* */
@Getter
@NoArgsConstructor
public class FreePostRequestDto {
    private Long id;
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
    public FreePostRequestDto(Long id, String title, String detail,
                              LocalDateTime createAt, LocalDateTime updateAt, String imagePath,
                              boolean isAnonymous, int views, int commentCount, int goodCount) {
        this.id = id;
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

    public FreePost toEntity(Member member) {
        return FreePost.builder()
                .memberId(member)
                .title(this.title)
                .detail(this.detail)
                .imagePath(this.imagePath)
                .isAnonymous(this.isAnonymous)
                .build();
    }
}
