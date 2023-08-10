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

}
