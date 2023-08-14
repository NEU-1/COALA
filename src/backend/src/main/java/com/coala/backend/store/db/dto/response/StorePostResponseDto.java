package com.coala.backend.store.db.dto.response;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.store.db.entity.StorePost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StorePostResponseDto {

    private StorePost storePost;

    private BaseResponseDto baseResponseDto;
}
