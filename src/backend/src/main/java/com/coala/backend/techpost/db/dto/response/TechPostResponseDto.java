package com.coala.backend.techpost.db.dto.response;

import com.coala.backend.member.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
    테크게시판 응답 DTO 입니다.
*/

@Getter
@NoArgsConstructor
public class TechPostResponseDto {
    private Long id;
    private Member userId;
    private String title;
    private String detail;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String imagePath;
    private Member nickname;
    private int views;
    private int count;

    @Builder
    public TechPostResponseDto(Long id, Member userId, String title, String detail, LocalDateTime createAt, LocalDateTime updateAt,
                               String imagePath, Member nickname, int views, int count) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.detail = detail;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.imagePath = imagePath;
        this.nickname = nickname;
        this.views = views;
        this.count = count;
    }

}
