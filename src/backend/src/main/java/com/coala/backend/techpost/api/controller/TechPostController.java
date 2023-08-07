package com.coala.backend.techpost.api.controller;

import com.coala.backend.freepost.db.dto.response.BaseResponseDto;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.techpost.api.service.TechPostServiceImpl;
import com.coala.backend.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.techpost.db.entity.TechPost;
import com.coala.backend.techpost.db.repository.TechPostRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        Member member = techPostService.savePost(requestDto, getEmail(httpServletRequest));

        return ResponseEntity.ok()
                .header("성공", "게시글 작성")
                .body(requestDto.toEntity(member));
    }

    // 게시글 수정
    @PutMapping("update/{id}")
    public ResponseEntity<TechPost> updateTechPost(@PathVariable("id") Long id,
                                                   @RequestBody @Valid TechPostRequestDto requestDto, HttpServletRequest httpServletRequest) {
        techPostService.updateTechPost(id, requestDto, getEmail(httpServletRequest));
        TechPost findPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시물이 존재하지 않습니다.");
        });

        return ResponseEntity.ok()
                .body(findPost);
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("{page}")
    public ResponseEntity<BaseResponseDto> techPostList(@PathVariable("page") Integer page) {
        BaseResponseDto postAll = techPostService.getPostList(page);

        return ResponseEntity.status(postAll.getStatusCode())
                .body(postAll);
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("search/{keyword}/{page}")
    public ResponseEntity<BaseResponseDto> findTechPosts(@PathVariable("keyword") String keyword,
                                               @PathVariable("page") Integer page) {
        BaseResponseDto findAll = techPostService.searchPosts(keyword, page);

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
    public void techPostDelete(@PathVariable("id") Long id, @RequestBody @Valid TechPostRequestDto techPostRequestDto, HttpServletRequest httpServletRequest) {
        techPostService.deletePost(id, techPostRequestDto, getEmail(httpServletRequest));
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