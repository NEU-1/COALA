package com.coala.backend.mypage.api.service;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface MyPageService {

    ListResponseDto myStore(Member member);

    ListResponseDto myAuction(Member member);

    ListResponseDto myFavorite(Member member);

    BaseResponseDto myProfile(MultipartFile file, Member member);

}
