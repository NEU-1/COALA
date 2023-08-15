package com.coala.backend.community.notice.api.controller;

import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.community.notice.api.service.NoticeServiceImpl;
import com.coala.backend.community.notice.db.dto.request.NoticeRequestDto;
import com.coala.backend.community.notice.db.dto.response.NoticeResponseDto;
import com.coala.backend.community.notice.db.entity.Notice;
import com.coala.backend.community.notice.db.repository.NoticeRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private final JwtTokenProvider jwtTokenProvider;

    private static String accessToken = "";

    // 게시글 저장
    @PostMapping("post/save")
    public ResponseEntity<Notice> saveNoticePost(@RequestBody @Valid NoticeRequestDto requestDto, HttpServletRequest httpServletRequest) {
        adminAccess(httpServletRequest);
        noticeService.savePost(requestDto);

        return ResponseEntity.ok()
                .body(requestDto.toEntity());
    }

    // 게시글 수정
    @PutMapping("post/update/{id}")
    public ResponseEntity<NoticeResponseDto> updateNotice(@PathVariable("id") Long id,
                                              @RequestBody @Valid NoticeRequestDto requestDto, HttpServletRequest httpServletRequest) {
        adminAccess(httpServletRequest);

        noticeService.updateNotice(id, requestDto);
        Notice noticePost = noticeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        return ResponseEntity.ok()
                .body(NoticeResponseDto.builder()
                        .id(noticePost.getId())
                        .title(noticePost.getTitle())
                        .detail(noticePost.getDetail())
                        .createAt(noticePost.getCreateAt())
                        .updateAt(noticePost.getUpdateAt())
                        .imagePath(noticePost.getImagePath())
                        .build());
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("post/{page}")
    public ResponseEntity<BasePostResponseDto> noticeList(@PathVariable("page") Integer page) {
        BasePostResponseDto postAll = noticeService.getPostList(page);

        return ResponseEntity.status(postAll.getStatusCode())
                .body(postAll);
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("post/search/{keyword}/{page}")
    public ResponseEntity<BasePostResponseDto> findNoticePosts(@PathVariable("keyword") String keyword,
                                               @PathVariable("page") Integer page) {
        BasePostResponseDto findAll = noticeService.searchPosts(keyword, page);

        return ResponseEntity.status(findAll.getStatusCode())
                .body(findAll);
    }

    // 게시물 상세화면
    @GetMapping("post/detail/{id}")
    public ResponseEntity<NoticeResponseDto> detailNoticePost(@PathVariable("id") Long id) {
        NoticeResponseDto noticeResponseDto = noticeService.getPost(id);

        return ResponseEntity.ok()
                .body(noticeResponseDto);
    }
    
    // 게시물 삭제
    @DeleteMapping("delete/{id}")
    public void noticeDelete(@PathVariable("id") Long id, @RequestBody HttpServletRequest httpServletRequest) {
        adminAccess(httpServletRequest);
        noticeService.deletePost(id);
    }

    public void adminAccess(HttpServletRequest httpServletRequest) {
        accessToken = jwtTokenProvider.getHeaderToken(httpServletRequest, "Access");
        String email = jwtTokenProvider.getEmailFromToken(accessToken);

        if (!email.equals("coala1080@gmail.com")) {
            throw new IllegalArgumentException("ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ㄴㅏㄱㅏ. ");
        }
    }
}