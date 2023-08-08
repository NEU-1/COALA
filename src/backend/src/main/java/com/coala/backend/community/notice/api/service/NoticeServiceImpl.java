package com.coala.backend.community.notice.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.notice.db.dto.response.NoticeResponseDto;
import com.coala.backend.community.notice.db.entity.Notice;
import com.coala.backend.community.notice.db.dto.request.NoticeRequestDto;
import com.coala.backend.community.notice.db.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/*
 공지게시판 기능 구현 Impl 입니다.

* */

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;

    @Transactional
    @Override
    public void savePost(NoticeRequestDto postDto) {
        noticeRepository.saveAndFlush(postDto.toEntity());
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto getPostList(int page) {
        Pageable pageable = PageRequest.of(page,8, Sort.by("createAt").descending().and(Sort.by("updateAt")));

        List<NoticeResponseDto> allList = noticeRepository.findAll(pageable).stream()
                .map(notice -> NoticeResponseDto.builder()
                        .id(notice.getId())
                        .title(notice.getTitle())
                        .detail(notice.getDetail())
                        .createAt(notice.getCreateAt())
                        .updateAt(notice.getUpdateAt())
                        .imagePath(notice.getImagePath())
                        .build())
                .collect(Collectors.toList());

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공")
                .detail(allList.size())
                .list(allList)
                .build();
    }

    @Transactional
    @Override
    public NoticeResponseDto getPost(Long id) {
        Notice notice = noticeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        return NoticeResponseDto.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .detail(notice.getDetail())
                .createAt(notice.getCreateAt())
                .updateAt(notice.getUpdateAt())
                .imagePath(notice.getImagePath())
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id) {
        noticeRepository.deleteById(id);
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto searchPosts(String keyword, int page) {
            Pageable pageable = PageRequest.of(page,8, Sort.by("createAt").descending().and(Sort.by("updateAt")));
            List<NoticeResponseDto> searchList = noticeRepository.findByTitleContaining(keyword, pageable).stream()
                    .map(notice -> NoticeResponseDto.builder()
                            .id(notice.getId())
                            .title(notice.getTitle())
                            .detail(notice.getDetail())
                            .createAt(notice.getCreateAt())
                            .updateAt(notice.getUpdateAt())
                            .imagePath(notice.getImagePath())
                            .build())
                    .collect(Collectors.toList());

            return CommunityBaseResponseDto.builder()
                    .statusCode(200)
                    .msg("성공")
                    .detail(searchList.size())
                    .list(searchList)
                    .build();
    }


    @Transactional
    @Override
    public void updateNotice(Long id, NoticeRequestDto dto) {
        Notice notice = noticeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("없는 게시판 입니다.");
        });

        notice.updateFreePost(
                dto.getTitle(),
                dto.getDetail(),
                dto.getImagePath());

        noticeRepository.save(notice);
    }
}
