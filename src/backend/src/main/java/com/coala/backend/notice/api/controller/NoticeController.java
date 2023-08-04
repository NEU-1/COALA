package com.coala.backend.notice.api.controller;

import com.coala.backend.notice.api.service.NoticeServiceImpl;
import com.coala.backend.notice.db.dto.request.NoticeRequestDto;
import com.coala.backend.notice.db.dto.response.NoticeResponseDto;
import com.coala.backend.notice.db.entity.Notice;
import com.coala.backend.notice.db.repository.NoticeRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
    자유게시판 controller 입니다.
    - 업데이트 시 추천수미구현, 페이징 기능 개선 필요
*/

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@RequestMapping("/api/notice/")
public class NoticeController {
    private final NoticeServiceImpl noticeService;
    private final NoticeRepository noticeRepository;

    // 게시글 저장
    @PostMapping("post/save")
    public NoticeResponseDto saveNoticePost(@RequestBody @Valid NoticeRequestDto requestDto) {
        noticeService.savePost(requestDto);

        return new NoticeResponseDto(
                requestDto.toEntity().getId(),
                requestDto.toEntity().getTitle(),
                requestDto.toEntity().getDetail(),
                requestDto.toEntity().getCreateAt(),
                requestDto.toEntity().getUpdateAt(),
                requestDto.toEntity().getImagePath());
    }

    // 게시글 수정
    @PutMapping("post/update/{id}")
    public NoticeResponseDto updateNotice(@PathVariable("id") Long id,
                                              @RequestBody @Valid NoticeRequestDto requestDto) {
        noticeService.updateNotice(id, requestDto);
        Optional<Notice> findPost = noticeRepository.findById(id);
        Notice notice = findPost.get();

        return new NoticeResponseDto(
                notice.getId(),
                notice.getTitle(),
                notice.getDetail(),
                notice.getCreateAt(),
                notice.getUpdateAt(),
                notice.getImagePath());
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("post/{page}")
    public List<NoticeResponseDto> noticeList(@PathVariable("page") Integer page) {
        List<NoticeRequestDto> postAll = noticeService.getPostList(page);

        return postAll.stream()
                .map(noticeRequestDto -> new NoticeResponseDto(
                        noticeRequestDto.getId(),
                        noticeRequestDto.getTitle(),
                        noticeRequestDto.getDetail(),
                        noticeRequestDto.getCreateAt(),
                        noticeRequestDto.getUpdateAt(),
                        noticeRequestDto.getImagePath()))
                .collect(Collectors.toList());
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("post/search/{keyword}/{page}")
    public List<NoticeResponseDto> findNoticePosts(@PathVariable("keyword") String keyword,
                                               @PathVariable("page") Integer page) {
        List<NoticeRequestDto> findAll = noticeService.searchPosts(keyword, page);

        return findAll.stream()
                .map(noticeRequestDto -> new NoticeResponseDto(
                        noticeRequestDto.getId(),
                        noticeRequestDto.getTitle(),
                        noticeRequestDto.getDetail(),
                        noticeRequestDto.getCreateAt(),
                        noticeRequestDto.getUpdateAt(),
                        noticeRequestDto.getImagePath()))
                .collect(Collectors.toList());
    }

    // 게시물 상세화면
    @GetMapping("post/detail/{id}")
    public NoticeResponseDto detailNoticePost(@PathVariable("id") Long id) {
        NoticeRequestDto noticeRequestDto = noticeService.getPost(id);

        return new NoticeResponseDto(
                noticeRequestDto.getId(),
                noticeRequestDto.getTitle(),
                noticeRequestDto.getDetail(),
                noticeRequestDto.getCreateAt(),
                noticeRequestDto.getUpdateAt(),
                noticeRequestDto.getImagePath());
    }
    
    // 게시물 삭제
    @DeleteMapping("delete/{id}")
    public void noticeDelete(@PathVariable("id") Long id) {noticeService.deletePost(id);}
}