package com.coala.backend.techpost.db.dto.request;

import com.coala.backend.member.db.entity.Member;
import com.coala.backend.techpost.db.entity.TechPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
    태크 게시판 요청 Dto 입니다.
- 추천 수 기능 미구현
* */
@Getter
@NoArgsConstructor
public class TechPostRequestDto {
    private Long id;
    private Member memberId;
    private String title;
    private String detail;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String imagePath;
    private Member nickname;
    private int views;
    private int count;

    @Builder
    public TechPostRequestDto(Long id, Member memberId, String title, String detail,
                              LocalDateTime createAt, LocalDateTime updateAt, String imagePath,
                              Member nickname, int views, int count) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.detail = detail;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.imagePath = imagePath;
        this.nickname = nickname;
        this.views = views;
        this.count = count;
    }

    public TechPost toEntity() {
        return TechPost.builder()
                .memberId(this.memberId)
                .title(this.title)
                .detail(this.detail)
                .imagePath(this.imagePath)
                .nickname(this.nickname)
                .build();
    }
}
