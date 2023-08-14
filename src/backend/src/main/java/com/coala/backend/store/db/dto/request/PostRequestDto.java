package com.coala.backend.store.db.dto.request;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.product.db.entity.Category;
import com.coala.backend.store.db.entity.StorePost;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class PostRequestDto {

//    // 제목
//    private String title;
//
//    // 내용
//    private String detail;
//
//    // 최소 대여 기간
//    private Integer minRentalPeriod;
//
//    // 최대 대여 기간
//    private Integer maxRentalPeriod;
//
//    // 상한 날짜
//    private LocalDateTime limitDate;
//
//    // 대여 비용
//    private Integer rentalCost;
//
//    // 보증
//    private Integer deposit;

    private StorePost storePost;

    private Category category;

    private BaseResponseDto baseResponseDto;
}
