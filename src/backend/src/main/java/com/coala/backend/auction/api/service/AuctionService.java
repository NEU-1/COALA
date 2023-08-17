package com.coala.backend.auction.api.service;

import com.coala.backend.auction.db.dto.response.ApplySetResponseDto;
import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.auction.db.entity.AuctionPost;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.auction.db.dto.response.PostResponseDto;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface AuctionService {

    ListResponseDto list(Integer page, Map<String, String> info);

    BaseResponseDto write(Map<String, String> info, Member member);

    void views(Long id);

    PostResponseDto detail(Long id, String email);

    BaseResponseDto update(Long id,Map<String, String> info, String email);

    BaseResponseDto delete(Long id, String email);

    ApplySetResponseDto apply(Long id, AuctionApply auctionApply, String email);

    BaseResponseDto status(Long id, String email);

    PostResponseDto valid(Long id, String email);

    int getId(Long id) throws Exception;
}
