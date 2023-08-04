package com.coala.backend.member.db.dto.request;

import lombok.*;

/*
    SignUp Request Dto
 */
@Getter
@Setter
@NoArgsConstructor
public class MemberRequestDto {

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

    // password 암호화 저장 필요
    private String password;

    // password 암호화 저장 필요
    private String passwordCheck;

    public MemberRequestDto(String email, String password, String passwordCheck) {
        this.email = email;
        this.password = password;
        this.passwordCheck = passwordCheck;
    }

    public void setEncodePassword(String encodePassword){
        this.password = encodePassword;
    }
}
