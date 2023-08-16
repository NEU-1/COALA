package com.coala.backend.community.notice.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.notice.db.dto.response.NoticeResponseDto;
import com.coala.backend.community.notice.db.entity.Notice;
import com.coala.backend.community.notice.db.dto.request.NoticeRequestDto;
import com.coala.backend.community.notice.db.repository.NoticeRepository;
import com.coala.backend.s3.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;

    private final S3UploadService s3UploadService;

    // S3 주소
    static String str = "https://coala.s3.ap-northeast-2.amazonaws.com/Notice/";


    @Transactional
    @Override
    public CommunityBaseResponseDto savePost(NoticeRequestDto postDto) {
        Notice notice = Notice.builder()
                .title(postDto.getTitle())
                .detail(postDto.getDetail())
                .images(postDto.getImagePath())
                .build();

        noticeRepository.saveAndFlush(notice);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 게시글 Id 반환, image 주소 반환")
                .id(notice.getId())
                .build();
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto getPostList(int page) {
        Pageable pageable = PageRequest.of(page,7, Sort.by("createAt").descending().and(Sort.by("updateAt")));

        List<NoticeResponseDto> allList = noticeRepository.findAll(pageable).stream()
                .map(notice -> NoticeResponseDto.builder()
                        .id(notice.getId())
                        .title(notice.getTitle())
                        .detail(notice.getDetail())
                        .imagePath(str + notice.getImages())
                        .createAt(notice.getCreateAt())
                        .updateAt(notice.getUpdateAt())
                        .build())
                .collect(Collectors.toList());

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 전체 페이지 수 & 해당 페이지 글 목록")
                .detail(1 + allList.size() / 7)
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
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id) {
        Notice notice = noticeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시판이 존재하지 않습니다.");
        });

        noticeRepository.deleteById(id);
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto searchPosts(String keyword, int page) {
            Pageable pageable = PageRequest.of(page,7, Sort.by("createAt").descending().and(Sort.by("updateAt")));
            List<NoticeResponseDto> searchList = noticeRepository.findByTitleContaining(keyword, pageable).stream()
                    .map(notice -> NoticeResponseDto.builder()
                            .id(notice.getId())
                            .title(notice.getTitle())
                            .detail(notice.getDetail())
                            .imagePath(str + notice.getImages())
                            .createAt(notice.getCreateAt())
                            .updateAt(notice.getUpdateAt())
                            .build())
                    .collect(Collectors.toList());

            return CommunityBaseResponseDto.builder()
                    .statusCode(200)
                    .msg("성공,  전체 페이지 수 & 해당 페이지 글 목록")
                    .detail(1 + searchList.size() / 7)
                    .list(searchList)
                    .build();
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto updateNotice(Long id, NoticeRequestDto dto) {
        Notice notice = noticeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("없는 게시판 입니다.");
        });

        notice.updateFreePost(
                dto.getTitle(),
                dto.getDetail(),
                dto.getImagePath());

        noticeRepository.save(notice);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 게시글 Id 반환")
                .id(id)
                .build();
    }
}
