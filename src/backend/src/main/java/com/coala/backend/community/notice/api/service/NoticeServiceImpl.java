package com.coala.backend.community.notice.api.service;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.notice.db.dto.response.NoticeResponseDto;
import com.coala.backend.community.notice.db.entity.Notice;
import com.coala.backend.community.notice.db.dto.request.NoticeRequestDto;
import com.coala.backend.community.notice.db.entity.NoticeImage;
import com.coala.backend.community.notice.db.repository.NoticeImageRepository;
import com.coala.backend.community.notice.db.repository.NoticeRepository;
import com.coala.backend.s3.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
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
    private final NoticeImageRepository noticeImageRepository;

    private final S3UploadService s3UploadService;

    // S3 주소
    static String str = "https://coala.s3.ap-northeast-2.amazonaws.com/Notice/";


    @Transactional
    @Override
    public CommunityBaseResponseDto savePost(List<MultipartFile> multipartFiles, NoticeRequestDto postDto) throws IOException {
        Notice notice = Notice.builder()
                .title(postDto.getTitle())
                .detail(postDto.getDetail())
                .build();

        noticeRepository.saveAndFlush(postDto.toEntity());

        if (!multipartFiles.isEmpty()) {
            for (int i = 0; i < multipartFiles.size(); i++) {
                String storedFileName = s3UploadService.S3Upload(multipartFiles.get(i), "Notice");
                if (storedFileName.equals("사진없음")) break;

                // S3주소 빼고 넣기
                noticeImageRepository.save(NoticeImage.builder()
                        .imagePath(storedFileName.substring(str.length()))
                        .npId(notice)
                        .build());
            }
            log.info("NoticeImage 업로드 성공");
        }

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

        // 불러올 때는 다시 주소 붙여서
        List<String> uri = new ArrayList<>();
        List<NoticeImage> imageList = noticeImageRepository.findByNpId(notice);
        for (int i = 0; i < imageList.size(); i++) {
            NoticeImage noticeImage = imageList.get(i);
            uri.add(str + noticeImage.getImagePath());
        }

        return NoticeResponseDto.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .detail(notice.getDetail())
                .imagePath(uri)
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

        noticeImageRepository.findByNpId(notice);
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
    public CommunityBaseResponseDto updateNotice(List<MultipartFile> multipartFiles, Long id, NoticeRequestDto dto) {
        Notice notice = noticeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("없는 게시판 입니다.");
        });

        notice.updateFreePost(
                dto.getTitle(),
                dto.getDetail());
        noticeRepository.save(notice);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 게시글 Id 반환")
                .id(id)
                .build();
    }
}
