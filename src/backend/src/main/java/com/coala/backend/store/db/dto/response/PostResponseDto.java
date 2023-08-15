package com.coala.backend.store.db.dto.response;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.product.db.entity.Category;
import com.coala.backend.store.db.entity.StorePost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PostResponseDto {
    // 게시글 정보
    private StorePost storePost;

    private Integer like;

    private Category category;
    // 응답 정보
    private BaseResponseDto baseResponseDto;
}
