package com.coala.backend.notice.api.service;

import com.coala.backend.notice.db.dto.request.NoticeRequestDto;
import com.coala.backend.notice.db.entity.Notice;
import com.coala.backend.notice.db.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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
        noticeRepository.save(postDto.toEntity());
    }

    @Transactional
    @Override
    public List<NoticeRequestDto> getPostList(int page) {
        Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
        return noticeRepository.findAll(pageable).stream()
                .map(notice -> NoticeRequestDto.builder()
                        .id(notice.getId())
                        .title(notice.getTitle())
                        .detail(notice.getDetail())
                        .createAt(notice.getCreateAt())
                        .updateAt(notice.getUpdateAt())
                        .imagePath(notice.getImagePath())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public NoticeRequestDto getPost(Long id) {
        Optional<Notice> notice = noticeRepository.findById(id);
        Notice post = notice.get();

        return NoticeRequestDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .detail(post.getDetail())
                .createAt(post.getCreateAt())
                .updateAt(post.getUpdateAt())
                .imagePath(post.getImagePath())
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id) {
        noticeRepository.deleteById(id);
    }

    @Transactional
    @Override
    public List<NoticeRequestDto> searchPosts(String keyword, int page) {
            Pageable pageable = PageRequest.of(page,3, Sort.by("createAt").descending().and(Sort.by("updateAt")));
            return noticeRepository.findByTitleContaining(keyword, pageable).stream()
                    .map(notice -> NoticeRequestDto.builder()
                            .id(notice.getId())
                            .title(notice.getTitle())
                            .detail(notice.getDetail())
                            .createAt(notice.getCreateAt())
                            .updateAt(notice.getUpdateAt())
                            .imagePath(notice.getImagePath())
                            .build())
                    .collect(Collectors.toList());
    }


    @Transactional
    @Override
    public void updateNotice(Long id, NoticeRequestDto dto) {
        Optional<Notice> byId = noticeRepository.findById(id);
        Notice notice = byId.get();

        notice.updateFreePost(
                dto.getTitle(),
                dto.getDetail(),
                dto.getImagePath());
    }
}
