package com.coala.backend.member.db.dto.response;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BaseResponseDto {

    private String msg;
    private int statusCode;
    private int detail;

    public BaseResponseDto(String msg, int statusCode) {
        this.msg = msg;
        this.statusCode = statusCode;
    }

    public BaseResponseDto(String msg, int statusCode, int detail) {
        this.msg = msg;
        this.statusCode = statusCode;
        this.detail = detail;
    }
}

