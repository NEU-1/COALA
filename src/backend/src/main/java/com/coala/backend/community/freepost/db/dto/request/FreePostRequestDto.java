package com.coala.backend.community.freepost.db.dto.request;

import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.member.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
    자유 게시판 요청 Dto 입니다.
* */

@Getter
@NoArgsConstructor
public class FreePostRequestDto {
    private String title;
    private String detail;
    private boolean anonymous;
    private String imagePath;

    @Builder
    public FreePostRequestDto(String title, String detail, boolean anonymous, String imagePath) {

        this.title = title;
        this.detail = detail;
        this.anonymous = anonymous;
        this.imagePath = imagePath;
    }

    public FreePost toEntity(Member member) {
        return FreePost.builder()
                .memberId(member)
                .title(this.title)
                .detail(this.detail)
                .anonymous(this.anonymous)
                .build();
    }
}
