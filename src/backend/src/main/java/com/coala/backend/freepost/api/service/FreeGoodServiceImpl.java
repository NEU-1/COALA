package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeGoodRequestDto;
import com.coala.backend.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.freepost.db.entity.FreeGood;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.freepost.db.repository.FreeGoodRepository;
import com.coala.backend.freepost.db.repository.FreePostRepository;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.NotFound;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

import static org.hibernate.boot.model.process.spi.MetadataBuildingProcess.build;

@Slf4j
@Service
@RequiredArgsConstructor
public class FreeGoodServiceImpl implements FreeGoodService{
    private final FreeGoodRepository freeGoodRepository;
    private final MemberRepository memberRepository;
    private final FreePostRepository freePostRepository;

    @Transactional
    @Override
    public void good(FreeGoodRequestDto freeGoodRequestDto) {
        Member member = memberRepository.findByEmail(freeGoodRequestDto.getMemberId().getEmail()).orElseThrow(() -> {
            return new IllegalArgumentException("작성자 ID가 존재하지 않습니다.");
        });

        FreePost freePost = freePostRepository.findById(freeGoodRequestDto.getFpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (freeGoodRepository.findByMemberIdAndFpId(member, freePost).isPresent()) {
            return;
        };

        FreeGood freeGood = FreeGood.builder()
                .fpId(freePost)
                .writerId(freePost)
                .memberId(member)
                .build();

        freeGoodRepository.saveAndFlush(freeGood);
        freePost.getGoods().add(freeGood);

    }

    @Transactional
    @Override
    public void unGood(FreeGoodRequestDto freeGoodRequestDto) {
        Member member = memberRepository.findByEmail(freeGoodRequestDto.getMemberId().getEmail()).orElseThrow(() -> {
            return new IllegalArgumentException("작성자 ID가 존재하지 않습니다.");
        });
        FreePost freePost = freePostRepository.findById(freeGoodRequestDto.getFpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });


        FreeGood freeGood = freeGoodRepository.findByMemberIdAndFpId(member, freePost).orElseThrow(() -> {
            return new IllegalArgumentException("없는 추천 입니다.");
        });


        freeGoodRepository.deleteById(freeGood.getId());
        freePost.getGoods().remove(freeGood);
    }
}
