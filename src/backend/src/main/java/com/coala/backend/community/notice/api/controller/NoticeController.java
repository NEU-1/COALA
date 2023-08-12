package com.coala.backend.community.notice.api.controller;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.notice.api.service.NoticeService;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.community.notice.db.dto.request.NoticeRequestDto;
import com.coala.backend.community.notice.db.dto.response.NoticeResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
    공지 게시판 controller 입니다.
*/

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@RequestMapping("/api/notice/post/")
public class NoticeController {
    private final NoticeService noticeService;
    private final JwtTokenProvider jwtTokenProvider;

    private static String accessToken = "";

    // 게시글 저장
    @PostMapping("save")
    public ResponseEntity<CommunityBaseResponseDto> saveNoticePost(@RequestBody @Valid NoticeRequestDto requestDto,
                                                                   HttpServletRequest httpServletRequest) {
        adminAccess(httpServletRequest);
        CommunityBaseResponseDto responseDto = noticeService.savePost(requestDto);

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 게시글 수정
    @PutMapping("update/{id}")
    public ResponseEntity<CommunityBaseResponseDto> updateNotice(@PathVariable("id") Long id, HttpServletRequest httpServletRequest,
                                                          @RequestBody @Valid NoticeRequestDto requestDto) {
        adminAccess(httpServletRequest);
        CommunityBaseResponseDto responseDto = noticeService.updateNotice(id, requestDto);

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("{page}")
    public ResponseEntity<CommunityBaseResponseDto> noticeList(@PathVariable("page") Integer page) {
        CommunityBaseResponseDto responseDto = noticeService.getPostList(page);

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("search/{keyword}/{page}")
    public ResponseEntity<CommunityBaseResponseDto> findNoticePosts(@PathVariable("keyword") String keyword,
                                                                    @PathVariable("page") Integer page) {
        CommunityBaseResponseDto responseDto = noticeService.searchPosts(keyword, page);

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 게시물 상세화면
    @GetMapping("detail/{id}")
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