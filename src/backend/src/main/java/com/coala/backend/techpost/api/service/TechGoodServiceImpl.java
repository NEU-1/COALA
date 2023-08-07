package com.coala.backend.techpost.api.service;

import com.coala.backend.freepost.db.dto.response.BaseResponseDto;
import com.coala.backend.freepost.db.entity.FreeGood;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.techpost.db.dto.request.TechGoodRequestDto;
import com.coala.backend.techpost.db.entity.TechGood;
import com.coala.backend.techpost.db.entity.TechPost;
import com.coala.backend.techpost.db.repository.TechGoodRepository;
import com.coala.backend.techpost.db.repository.TechPostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TechGoodServiceImpl implements TechGoodService {
    private final TechGoodRepository techGoodRepository;
    private final MemberRepository memberRepository;
    private final TechPostRepository techPostRepository;

    @Transactional
    @Override
    public BaseResponseDto good(TechGoodRequestDto techGoodRequestDto, Member member) {
        TechPost techPost = techPostRepository.findById(techGoodRequestDto.getTpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (techGoodRepository.findByMemberIdAndTpId(member, techPost).isPresent()) {
            throw new IllegalArgumentException("이미 추천되어 있습니다.");
        };

        List<TechGood> allGood = techGoodRepository.findByTpId(techPost);

        TechGood techGood = TechGood.builder()
                .tpId(techPost)
                .writerId(techPost)
                .memberId(member)
                .build();

        techGoodRepository.saveAndFlush(techGood);
        techPost.getGoods().add(techGood);

        return BaseResponseDto.builder()
                .statusCode(200)
                .msg("좋아요")
                .detail(allGood.size())
                .build();
    }

    @Transactional
    @Override
    public BaseResponseDto unGood(TechGoodRequestDto techGoodRequestDto, Member member) {
        TechPost techPost = techPostRepository.findById(techGoodRequestDto.getTpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        TechGood techGood = techGoodRepository.findByMemberIdAndTpId(member, techPost).orElseThrow(() -> {
            return new IllegalArgumentException("없는 추천 입니다.");
        });

        List<TechGood> allGood = techGoodRepository.findByTpId(techPost);

        techGoodRepository.deleteById(techGood.getId());
        techPost.getGoods().remove(techGood);

        return BaseResponseDto.builder()
                .statusCode(200)
                .msg("좋아요 취소")
                .detail(allGood.size())
                .build();
    }
}
