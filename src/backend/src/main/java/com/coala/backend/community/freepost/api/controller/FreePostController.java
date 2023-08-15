package com.coala.backend.community.freepost.api.controller;

import com.coala.backend.community.freepost.api.service.FreePostService;
import com.coala.backend.community.freepost.db.dto.request.FreePostRequestDto;
import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.repository.FreePostRepository;
import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.freepost.db.dto.response.FreePostResponseDto;
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

/*
    자유게시판 controller 입니다.
    - 업데이트 시 추천수미구현, 페이징 기능 개선 필요
*/
@CrossOrigin(origins = "*")
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

        return ResponseEntity.ok()
                .body(requestDto.toEntity(freePostService.savePost(requestDto, getEmail(httpServletRequest))));
    }

    // 게시글 수정
    @PutMapping("post/update/{id}")
    public ResponseEntity<FreePostResponseDto> updatePost(@PathVariable("id") Long id,
                                               @RequestBody @Valid FreePostRequestDto requestDto,
                                               HttpServletRequest httpServletRequest) {

        freePostService.updateFreePost(id, requestDto, getEmail(httpServletRequest));

        FreePost freePost = freePostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시물이 존재하지 않습니다.");
        });

        return ResponseEntity.ok()
                .body(FreePostResponseDto.builder()
                        .id(freePost.getId())
                        .memberId(freePost.getMemberId())
                        .title(freePost.getTitle())
                        .detail(freePost.getDetail())
                        .createAt(freePost.getCreateAt())
                        .updateAt(freePost.getUpdateAt())
                        .isAnonymous(freePost.isAnonymous())
                        .views(freePost.getViews())
                        .commentCount(freePost.getCommentCount())
                        .goodCount(freePost.getGoodCount())
                        .build());
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("post/{page}")
    public ResponseEntity<BasePostResponseDto> freePostList(@PathVariable("page") Integer page) {
        BasePostResponseDto postDto = freePostService.getPostList(page);

        return ResponseEntity.status(postDto.getStatusCode()).body(postDto);
    }

    // 검색어 관련 게시물 불러오기
    @GetMapping("post/search/{keyword}/{page}")
    public ResponseEntity<BasePostResponseDto> findFreePosts(@PathVariable("keyword") String keyword,
                                                             @PathVariable("page") Integer page) {
        BasePostResponseDto postDto = freePostService.searchPosts(keyword, page);

        return ResponseEntity.status(postDto.getStatusCode()).body(postDto);
    }

    // 게시물 상세화면
    @GetMapping("post/detail/{id}")
    public ResponseEntity<FreePostResponseDto> detailFreePost(@PathVariable("id") Long id) {
        FreePostResponseDto freePostDto = freePostService.getPost(id);

        return ResponseEntity.ok()
                .body(freePostDto);
    }

    // 게시물 삭제
    @DeleteMapping("post/delete/{id}")
    public void freePostDelete(@PathVariable("id") Long id, @RequestBody @Valid HttpServletRequest httpServletRequest) {
        freePostService.deletePost(id, getEmail(httpServletRequest));
    }

    public Member getEmail(HttpServletRequest httpServletRequest) {
        accessToken = jwtTokenProvider.getHeaderToken(httpServletRequest, "Access");
        String email = jwtTokenProvider.getEmailFromToken(accessToken);

        Member member = memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("작성자 ID가 존재하지 않습니다.");
        });;

        return member;
    }
}