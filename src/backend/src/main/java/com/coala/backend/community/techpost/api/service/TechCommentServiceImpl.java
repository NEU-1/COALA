package com.coala.backend.community.techpost.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechCommentRequestDto;
import com.coala.backend.community.techpost.db.dto.response.TechCommentResponseDto;
import com.coala.backend.community.techpost.db.entity.TechComment;
import com.coala.backend.community.techpost.db.entity.TechPost;
import com.coala.backend.community.techpost.db.repository.TechCommentRepository;
import com.coala.backend.community.techpost.db.repository.TechPostRepository;
import com.coala.backend.member.db.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechCommentServiceImpl implements TechCommentService {
    private final TechCommentRepository techCommentRepository;
    private final TechPostRepository techPostRepository;

    @Transactional
    @Override
    public CommunityBaseResponseDto saveComment(Long postId, TechCommentRequestDto commentDto, Member member) {
        TechPost techPost = techPostRepository.findById(postId).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        TechComment techComment = TechComment.builder()
                .tpId(commentDto.getTpId())
                .isAnonymous(commentDto.isAnonymous())
                .content(commentDto.getContent())
                .memberId(member)
                .build();

        techCommentRepository.saveAndFlush(techComment);
        techPost.getComments().add(techComment);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 게시글 Id 반환")
                .id(postId)
                .build();
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto getCommentList(Long id, int page, Member member) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by("createAt").descending());

        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        List<TechCommentResponseDto> postComments = techCommentRepository.findByTpId(techPost, pageable).stream()
                .map(techComment -> TechCommentResponseDto.builder()
                        .id(techComment.getId())
                        .tpId(id)
                        .isAnonymous(techComment.isAnonymous())
                        .nickname(member.getNickname())
                        .content(techComment.getContent())
                        .mine(techComment.getMemberId().getEmail().equals(member.getEmail()))
                        .createAt(techComment.getCreateAt())
                        .updateAt(techComment.getUpdateAt())
                        .build())
                .collect(Collectors.toList());

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 페이지 수 && 해당 페이지 댓글 목록")
                .detail(1 + postComments.size() / 5)
                .list(postComments)
                .build();
    }

    @Transactional
    @Override
    public void deleteComment(Long id, Member member) {
        TechComment techComment = techCommentRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });

        TechPost techPost = techPostRepository.findById(techComment.getTpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (!techComment.getMemberId().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("해당 댓글의 작성자가 아닙니다!!!");
        } else if (!techComment.getTpId().getId().equals(techPost.getId())) {
            throw new IllegalArgumentException("해당 게시글의 댓글이 아닙니다!!!");
        }

        techCommentRepository.deleteById(id);
        techPost.getComments().remove(techComment);
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto updateTechComment(Long id, TechCommentRequestDto dto, Member member) {
        TechComment techComment = techCommentRepository.findById(id).orElseThrow(() -> {
           return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });

        if (!techComment.getMemberId().equals(member.getEmail())) {
            throw new IllegalArgumentException("해당 댓글의 작성자가 아닙니다!!!");
        }

        techComment.updateTechComment(dto.isAnonymous(), dto.getContent());
        techCommentRepository.save(techComment);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 게시글 Id 반환")
                .id(techComment.getTpId().getId())
                .build();
    }
}
