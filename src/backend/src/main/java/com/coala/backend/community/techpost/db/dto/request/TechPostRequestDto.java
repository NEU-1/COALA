package com.coala.backend.community.techpost.db.dto.request;

import com.coala.backend.member.db.entity.Member;
import com.coala.backend.community.techpost.db.entity.TechPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
    태크 게시판 요청 Dto 입니다.
- 추천 수 기능 미구현
* */
@Getter
@NoArgsConstructor
public class TechPostRequestDto {
    private String title;
    private String detail;
    private String imagePath;
    private Member nickname;

    @Builder
    public TechPostRequestDto(String title, String detail, String imagePath,
                              Member nickname) {
        this.title = title;
        this.detail = detail;
        this.imagePath = imagePath;
        this.nickname = nickname;
    }

    public TechPost toEntity(Member member) {
        return TechPost.builder()
                .memberId(member)
                .title(this.title)
                .detail(this.detail)
                .imagePath(this.imagePath)
                .nickname(this.nickname)
                .build();
    }
}
