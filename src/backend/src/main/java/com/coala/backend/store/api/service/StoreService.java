package com.coala.backend.store.api.service;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import com.coala.backend.store.db.dto.response.PostResponseDto;
import com.coala.backend.store.db.dto.response.StoreListDto;
import com.coala.backend.store.db.dto.response.StorePostResponseDto;
import com.coala.backend.store.db.entity.StoreImage;
import com.coala.backend.store.db.entity.StorePost;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public interface StoreService {


    ListResponseDto list(Integer page, Map<String, String> info, String email);

    StorePostResponseDto write(StorePost storePost, Member member);

    void views(Long id);

    PostResponseDto detail(Long id, String email);

    BaseResponseDto update(Long id,StorePost storePost, String email);

    BaseResponseDto delete(Long id, String email);

    BaseResponseDto like(Long id, String email);

    BaseResponseDto status(Long id, String email);

    PostResponseDto valid(Long id, String email);

}
