package com.coala.backend.notice.db.dto.request;

import com.coala.backend.notice.db.entity.Notice;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
    공지게시판 요청 Dto 입니다.
* */
@Getter
@NoArgsConstructor
public class NoticeRequestDto {
    private Long id;
    private String title;
    private String detail;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String imagePath;

    @Builder
    public NoticeRequestDto(Long id, String title, String detail,
                            LocalDateTime createAt, LocalDateTime updateAt,
                            String imagePath) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.imagePath = imagePath;
    }

    public Notice toEntity() {
        return Notice.builder()
                .title(this.title)
                .detail(this.detail)
                .imagePath(this.imagePath)
                .build();
    }
}
