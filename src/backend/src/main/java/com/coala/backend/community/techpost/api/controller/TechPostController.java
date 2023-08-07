package com.coala.backend.community.techpost.api.controller;

import com.coala.backend.community.common.dto.BasePostResponseDto;
import com.coala.backend.community.techpost.api.service.TechPostServiceImpl;
import com.coala.backend.community.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.community.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.community.techpost.db.entity.TechPost;
import com.coala.backend.community.techpost.db.repository.TechPostRepository;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
    테크게시판 controller 입니다.
*/

@Slf4j
@RestController
@CrossOrigin(origins="*")
@RequiredArgsConstructor
@RequestMapping("/api/tech/post/")
public class TechPostController {
    private final TechPostServiceImpl techPostService;
    private final TechPostRepository techPostRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    // 게시글 저장
    @PostMapping("save")
    public ResponseEntity<TechPost> saveTechPost(@RequestBody @Valid TechPostRequestDto requestDto, HttpServletRequest httpServletRequest) {

        return ResponseEntity.ok()
                .body(requestDto.toEntity(techPostService.savePost(requestDto, getEmail(httpServletRequest))));
    }

    // 게시글 수정
    @PutMapping("update/{id}")
    public ResponseEntity<TechPostResponseDto> updateTechPost(@PathVariable("id") Long id,
                                                   @RequestBody @Valid TechPostRequestDto requestDto, HttpServletRequest httpServletRequest) {
        techPostService.updateTechPost(id, requestDto, getEmail(httpServletRequest));
        TechPost findPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시물이 존재하지 않습니다.");
        });

        return ResponseEntity.ok()
                .body(TechPostResponseDto.builder()
                        .id(findPost.getId())
                        .memberId(findPost.getMemberId())
                        .title(findPost.getTitle())
                        .detail(findPost.getDetail())
                        .createAt(findPost.getCreateAt())
                        .updateAt(findPost.getUpdateAt())
                        .imagePath(findPost.getImagePath())
                        .nickname(findPost.getNickname())
                        .views(findPost.getViews())
                        .commentCount(findPost.getCommentCount())
                        .goodCount(findPost.getGoodCount())
                        .build());
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("{page}")
    public ResponseEntity<BasePostResponseDto> techPostList(@PathVariable("page") Integer page) {
        BasePostResponseDto postAll = techPostService.getPostList(page);

        return ResponseEntity.status(postAll.getStatusCode())
                .body(postAll);
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("search/{keyword}/{page}")
    public ResponseEntity<BasePostResponseDto> findTechPosts(@PathVariable("keyword") String keyword,
                                                             @PathVariable("page") Integer page) {
        BasePostResponseDto findAll = techPostService.searchPosts(keyword, page);

        return ResponseEntity.status(findAll.getStatusCode())
                .body(findAll);
    }

    // 게시물 상세화면
    @GetMapping("detail/{id}")
    public ResponseEntity<TechPostResponseDto> detailTechPost(@PathVariable("id") Long id) {
        TechPostResponseDto techPostDto = techPostService.getPost(id);

        return ResponseEntity.ok()
                .body(techPostDto);
    }
    
    // 게시물 삭제
    @DeleteMapping("delete/{id}")
    public void techPostDelete(@PathVariable("id") Long id, @RequestBody @Valid HttpServletRequest httpServletRequest) {
        techPostService.deletePost(id, getEmail(httpServletRequest));
    }

    public Member getEmail(HttpServletRequest httpServletRequest) {
        accessToken = jwtTokenProvider.getHeaderToken(httpServletRequest, "Access");
        String email = jwtTokenProvider.getEmailFromToken(accessToken);

        Member member = memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("작성자 ID가 존재하지 않습니다.");
        });

        return member;
    }
}