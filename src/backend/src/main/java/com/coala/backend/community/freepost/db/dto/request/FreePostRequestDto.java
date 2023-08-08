package com.coala.backend.community.freepost.db.dto.request;

import com.coala.backend.community.freepost.db.entity.FreePost;
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
    private String title;
    private String detail;
    private String imagePath;
    private boolean isAnonymous;

    @Builder
    public FreePostRequestDto(String title, String detail, String imagePath,
                              boolean isAnonymous) {

        this.title = title;
        this.detail = detail;
        this.imagePath = imagePath;
        this.isAnonymous = isAnonymous;
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
