package com.coala.backend.freepost.api.controller;

import com.coala.backend.freepost.api.service.FreePostService;
import com.coala.backend.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.freepost.db.dto.response.BaseResponseDto;
import com.coala.backend.freepost.db.dto.response.FreePostResponseDto;
import com.coala.backend.freepost.db.entity.FreePost;
import com.coala.backend.freepost.db.repository.FreePostRepository;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
    자유게시판 controller 입니다.
    - 업데이트 시 추천수미구현, 페이징 기능 개선 필요
*/
<<<<<<< HEAD
<<<<<<< HEAD

@Slf4j
=======
@CrossOrigin(origins = "*")
>>>>>>> feature/auction
=======
>>>>>>> chat/front
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/free/")
public class FreePostController {
    private final FreePostService freePostService;
    private final FreePostRepository freePostRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";
    // 게시글 저장
    @PostMapping("post/save")
    public ResponseEntity savePost(@RequestBody @Valid FreePostRequestDto requestDto, HttpServletRequest httpServletRequest) {

        return ResponseEntity.status(HttpStatus.OK)
                .header("게시글 작성", "성공")
                .body(requestDto.toEntity(freePostService.savePost(requestDto, getEmail(httpServletRequest))));
    }

    // 게시글 수정
    @PutMapping("post/update/{id}")
    public ResponseEntity<FreePost> updatePost(@PathVariable("id") Long id,
                                               @RequestBody @Valid FreePostRequestDto requestDto,
                                               HttpServletRequest httpServletRequest) {
        freePostService.updateFreePost(id, requestDto, getEmail(httpServletRequest));
        FreePost freePost = freePostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시물이 존재하지 않습니다.");
        });

        return ResponseEntity.status(HttpStatus.OK)
                .header("게시글 수정", "성공")
                .body(freePost);
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("post/{page}")
    public ResponseEntity<BaseResponseDto> freePostList(@PathVariable("page") Integer page) {
        BaseResponseDto postDto = freePostService.getPostList(page);

        return ResponseEntity.status(postDto.getStatusCode()).body(postDto);
    }

    // 검색어 관련 게시물 불러오기
    @GetMapping("post/search/{keyword}/{page}")
    public ResponseEntity<BaseResponseDto> findFreePosts(@PathVariable("keyword") String keyword,
                                               @PathVariable("page") Integer page) {
        BaseResponseDto postDto = freePostService.searchPosts(keyword, page);

        return ResponseEntity.status(postDto.getStatusCode()).body(postDto);
    }

    // 게시물 상세화면
    @GetMapping("post/detail/{id}")
    public ResponseEntity<FreePostResponseDto> detailFreePost(@PathVariable("id") Long id) {
        FreePostResponseDto freePostDto = freePostService.getPost(id);

        return ResponseEntity.ok()
                .header("성공", "게시글 상세")
                .body(freePostDto);
    }

    // 게시물 삭제
    @DeleteMapping("post/delete/{id}")
    public void freePostDelete(@PathVariable("id") Long id, @RequestBody @Valid FreePostRequestDto freePostRequestDto, HttpServletRequest httpServletRequest) {
        freePostService.deletePost(id, freePostRequestDto, getEmail(httpServletRequest));
    }

    public Member getEmail(HttpServletRequest httpServletRequest) {
        accessToken = httpServletRequest.getHeader("Access");
        String email = jwtTokenProvider.getEmailFromToken(accessToken);

        Member member = memberRepository.findByEmail(email).get();

        return member;
    }
}