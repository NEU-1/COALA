package com.coala.backend.community.freepost.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.freepost.db.dto.request.FreeCommentRequestDto;
import com.coala.backend.community.freepost.db.dto.response.FreeCommentResponseDto;
import com.coala.backend.community.freepost.db.entity.FreeComment;
import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.repository.FreePostRepository;
import com.coala.backend.community.freepost.db.repository.FreeCommentRepository;
import com.coala.backend.member.db.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FreeCommentServiceImpl implements FreeCommentService{
    private final FreeCommentRepository freeCommentRepository;
    private final FreePostRepository freePostRepository;

    @Transactional
    @Override
    public CommunityBaseResponseDto saveComment(Long id, FreeCommentRequestDto commentDto, Member member) {
        FreePost freePost = freePostRepository.findById(id).orElseThrow(()-> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        FreeComment freeComment = FreeComment.builder()
                .fpId(commentDto.getFpId())
                .isAnonymous(commentDto.isAnonymous())
                .content(commentDto.getContent())
                .memberId(member)
                .build();

        freeCommentRepository.saveAndFlush(freeComment);
        freePost.getComments().add(freeComment);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공. 게시글 Id 반환")
                .id(freePost.getId())
                .build();
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto getCommentList(Long id, int page, Member member) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by("createAt").descending());

        FreePost freePost = freePostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        List<FreeCommentResponseDto> postComments = freeCommentRepository.findByFpId(freePost, pageable).stream()
                .map(freeComment -> FreeCommentResponseDto.builder()
                        .id(freeComment.getId())
                        .fpId(id)
                        .isAnonymous(freeComment.isAnonymous())
                        .nickname(member.getNickname())
                        .content(freeComment.getContent())
                        .mine(freeComment.getMemberId().getEmail().equals(member.getEmail()))
                        .createAt(freeComment.getCreateAt())
                        .updateAt(freeComment.getUpdateAt())
                        .build())
                .collect(Collectors.toList());

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 페이지 수 & 댓글 목록 출력")
                .detail(1 + postComments.size() / 5)
                .list(postComments)
                .build();
    }

    @Transactional
    @Override
    public void deleteComment(Long id, Member member) {
        FreeComment freeComment = freeCommentRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });
        FreePost freePost = freePostRepository.findById(freeComment.getFpId().getId()).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (!freeComment.getMemberId().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("해당 댓글의 작성자가 아닙니다!!!");
        } else if (!freeComment.getFpId().getId().equals(freePost.getId())) {
            throw new IllegalArgumentException("해당 게시글의 댓글이 아닙니다!!!");
        }

        freeCommentRepository.deleteById(id);
        freePost.getComments().remove(freeComment);
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto updateFreeComment(Long id, FreeCommentRequestDto dto, Member member) {
        FreeComment freeComment = freeCommentRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("댓글이 존재하지 않습니다.");
        });

        if (!freeComment.getMemberId().equals(member.getEmail())) {
            throw new IllegalArgumentException("해당 댓글의 작성자가 아닙니다!!!");
        }

        freeComment.updateFreeComment(dto.isAnonymous(), dto.getContent());
        freeCommentRepository.save(freeComment);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공. 게시글 Id 반환")
                .id(dto.getFpId().getId())
                .build();
    }
}
