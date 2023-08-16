package com.coala.backend.member.db.dto.response;

import com.coala.backend.member.db.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberInfoResponseDto {
    private Member member;

    private BaseResponseDto baseResponseDto;

    // member Id
    private Long id;

    // 이메일
    private String email;

    // 이름
    private String name;

    // 별명
    private String nickname;

    // 학번
    private String studentId;

    // 지역
    private String depart;

    // 기수
    private String ordinal;

    // 핸드폰 번호
    private String phoneNo;

    private String msg;

    private int statusCode;

    public MemberInfoResponseDto(String msg, int statusCode) {
        this.msg = msg;
        this.statusCode = statusCode;
    }

}
