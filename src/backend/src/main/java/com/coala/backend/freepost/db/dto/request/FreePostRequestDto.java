package com.coala.backend.freepost.db.dto.request;

import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.member.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
    자유 게시판 요청 Dto 입니다.
- 조회 수, 추천 수 기능 미구현
* */
@Getter
@NoArgsConstructor
public class FreePostRequestDto {
    private Long id;
    private Member userId;
    private String title;
    private String detail;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String imagePath;
    private boolean isAnonymous;
    private int views;
    private int count;

    @Builder
    public FreePostRequestDto(Long id, Member userId, String title, String detail,
                              LocalDateTime createAt, LocalDateTime updateAt, String imagePath,
                              boolean isAnonymous, int views, int count) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.detail = detail;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.imagePath = imagePath;
        this.isAnonymous = isAnonymous;
        this.views = views;
        this.count = count;
    }

    public FreePost toEntity() {
        return FreePost.builder()
                .userId(this.userId)
                .title(this.title)
                .detail(this.detail)
                .imagePath(this.imagePath)
                .isAnonymous(this.isAnonymous)
                .build();
    }
}
