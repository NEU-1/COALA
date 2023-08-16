package com.coala.backend.community.common.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor
public class CommunityBaseResponseDto {

    private String msg;
    private int statusCode;
    private int detail;
    private Long id;
    private List<?> list = new ArrayList<>();

    @Builder
    public CommunityBaseResponseDto(String msg, int statusCode, int detail, List<?> list, Long id) {
        this.msg = msg;
        this.id = id;
        this.statusCode = statusCode;
        this.detail = detail;
        this.list = list;
    }
}
