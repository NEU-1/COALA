package com.coala.backend.store.api.service;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.store.db.dto.request.PostRequestDto;
import com.coala.backend.store.db.dto.response.PostResponseDto;
import com.coala.backend.store.db.entity.StorePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface StoreService {


    List<StorePost> list(Integer page, Map<String, String> info);

    BaseResponseDto write(Map<String, String> info, Member member);

    void views(Long id);

    PostResponseDto detail(Long id);

    BaseResponseDto update(Long id,Map<String, String> info, String email);

    BaseResponseDto delete(Long id, String email);

    BaseResponseDto like(Long id, String email);

    BaseResponseDto status(Long id, String email);
}
