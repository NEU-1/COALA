package com.coala.backend.member.db.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
    login을 위한 Request Dto
 */
@Getter
@Setter
@NoArgsConstructor
public class LoginRequestDto {

    private String email;

    private String password;

}
