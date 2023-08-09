package com.coala.backend.community.notice.db.dto.request;

import com.coala.backend.community.notice.db.entity.Notice;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
    공지게시판 요청 Dto 입니다.
* */
@Getter
@NoArgsConstructor
public class NoticeRequestDto {
    private String title;
    private String detail;

    @Builder
    public NoticeRequestDto(String title, String detail) {

        this.title = title;
        this.detail = detail;
    }

    public Notice toEntity() {
        return Notice.builder()
                .title(this.title)
                .detail(this.detail)
                .build();
    }
}
