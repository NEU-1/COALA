package com.coala.backend.mypage.db.dto.response;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProfileDto {

    private BaseResponseDto baseResponseDto;

    private String url;
}
