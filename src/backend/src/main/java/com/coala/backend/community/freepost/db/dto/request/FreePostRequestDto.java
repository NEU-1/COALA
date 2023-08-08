package com.coala.backend.community.freepost.db.dto.request;

import com.coala.backend.community.freepost.db.entity.FreeImage;
import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.member.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/*
    자유 게시판 요청 Dto 입니다.
* */
@Getter
@NoArgsConstructor
public class FreePostRequestDto {
    private String title;
    private String detail;
    private boolean isAnonymous;

    @Builder
    public FreePostRequestDto(String title, String detail, boolean isAnonymous) {

        this.title = title;
        this.detail = detail;
        this.isAnonymous = isAnonymous;
    }

    public FreePost toEntity(Member member) {
        return FreePost.builder()
                .memberId(member)
                .title(this.title)
                .detail(this.detail)
                .isAnonymous(this.isAnonymous)
                .build();
    }
}
