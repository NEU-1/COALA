package com.coala.backend.community.notice.db.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/*
    공지게시판 응답 DTO 입니다.
*/

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeResponseDto {
    private Long id;
    private String title;
    private String detail;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String imagePath;

    @Builder
    public NoticeResponseDto(Long id, String title, String detail,
                             LocalDateTime createAt, LocalDateTime updateAt, String imagePath) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.imagePath = imagePath;
    }
}
