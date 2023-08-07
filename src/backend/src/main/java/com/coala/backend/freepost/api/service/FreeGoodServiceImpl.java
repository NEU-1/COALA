package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeGoodRequestDto;
import com.coala.backend.freepost.db.dto.response.BaseResponseDto;
import com.coala.backend.freepost.db.entity.FreeGood;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.freepost.db.repository.FreeGoodRepository;
import com.coala.backend.freepost.db.repository.FreePostRepository;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.net.ssl.SSLEngineResult;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FreeGoodServiceImpl implements FreeGoodService{
    private final FreeGoodRepository freeGoodRepository;
    private final FreePostRepository freePostRepository;

    @Transactional
    @Override
    public BaseResponseDto good(FreeGoodRequestDto freeGoodRequestDto, Member member) {

        FreePost freePost = freePostRepository.findById(freeGoodRequestDto.getFpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        List<FreeGood> allGood = freeGoodRepository.findByFpId(freePost);

        FreeGood freeGood = FreeGood.builder()
                .fpId(freePost)
                .writerId(freePost)
                .memberId(member)
                .build();

        freeGoodRepository.saveAndFlush(freeGood);
        freePost.getGoods().add(freeGood);

        return BaseResponseDto.builder()
                .statusCode(200)
                .msg("좋아요")
                .detail(allGood.size())
                .build();

    }

    @Transactional
    @Override
    public BaseResponseDto unGood(FreeGoodRequestDto freeGoodRequestDto, Member member) {
        FreePost freePost = freePostRepository.findById(freeGoodRequestDto.getFpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        FreeGood freeGood = freeGoodRepository.findByMemberIdAndFpId(member, freePost).orElseThrow(() -> {
            return new IllegalArgumentException("없는 추천 입니다.");
        });

        List<FreeGood> allGood = freeGoodRepository.findByFpId(freePost);

        freeGoodRepository.deleteById(freeGood.getId());
        freePost.getGoods().remove(freeGood);

        return BaseResponseDto.builder()
                .statusCode(200)
                .msg("좋아요")
                .detail(allGood.size())
                .build();
    }
}
