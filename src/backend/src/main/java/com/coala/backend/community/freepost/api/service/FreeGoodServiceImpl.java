package com.coala.backend.community.freepost.api.service;

import com.coala.backend.community.freepost.db.dto.request.FreeGoodRequestDto;
import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.repository.FreeGoodRepository;
import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.freepost.db.entity.FreeGood;
import com.coala.backend.community.freepost.db.repository.FreePostRepository;
import com.coala.backend.member.db.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FreeGoodServiceImpl implements FreeGoodService{
    private final FreeGoodRepository freeGoodRepository;
    private final FreePostRepository freePostRepository;

    @Transactional
    @Override
    public CommunityBaseResponseDto good(FreeGoodRequestDto freeGoodRequestDto, Member member) {

        FreePost freePost = freePostRepository.findById(freeGoodRequestDto.getFpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (freeGoodRepository.findByMemberIdAndFpId(member, freePost).isPresent()) {
            throw new IllegalArgumentException("이미 추천되어 있습니다.");
        };

        FreeGood freeGood = FreeGood.builder()
                .fpId(freePost)
                .writerId(freePost)
                .memberId(member)
                .build();

        freeGoodRepository.saveAndFlush(freeGood);
        freePost.getGoods().add(freeGood);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("좋아요")
                .detail(freePost.getGoods().size())
                .build();

    }

    @Transactional
    @Override
    public CommunityBaseResponseDto unGood(FreeGoodRequestDto freeGoodRequestDto, Member member) {
        FreePost freePost = freePostRepository.findById(freeGoodRequestDto.getFpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        FreeGood freeGood = freeGoodRepository.findByMemberIdAndFpId(member, freePost).orElseThrow(() -> {
            return new IllegalArgumentException("없는 추천 입니다.");
        });

        freeGoodRepository.deleteById(freeGood.getId());
        freePost.getGoods().remove(freeGood);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("좋아요 취소")
                .detail(freePost.getGoods().size())
                .build();
    }
}
