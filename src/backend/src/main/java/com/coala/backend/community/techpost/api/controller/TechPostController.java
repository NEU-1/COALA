package com.coala.backend.community.techpost.api.controller;

import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.api.service.TechPostService;
import com.coala.backend.community.techpost.api.service.TechPostServiceImpl;
import com.coala.backend.community.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.community.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/*
    테크게시판 controller 입니다.
*/

@Slf4j
@RestController
@CrossOrigin(origins="*")
@RequiredArgsConstructor
@RequestMapping("/api/tech/post/")
public class TechPostController {
    private final TechPostService techPostService;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    private static String accessToken = "";

    // 게시글 저장
    @PostMapping(value = "save", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<CommunityBaseResponseDto> saveTechPost(@RequestPart(name = "requestDto") @Valid TechPostRequestDto requestDto,
                                                                 @RequestPart(name = "multipartFile") List<MultipartFile> multipartFile,
                                                                 HttpServletRequest httpServletRequest) throws IOException {

        CommunityBaseResponseDto responseDto = techPostService.savePost(multipartFile, requestDto, getEmail(httpServletRequest));

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 게시글 수정
    @PutMapping(value = "update/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<CommunityBaseResponseDto> updateTechPost(@PathVariable("id") Long id,
                                                                   @RequestPart(name = "requestDto") @Valid TechPostRequestDto requestDto,
                                                                   @RequestPart(name = "multipartFile") @Valid List<MultipartFile> multipartFile,
                                                                   HttpServletRequest httpServletRequest) throws IOException {

        CommunityBaseResponseDto responseDto = techPostService.updateTechPost(multipartFile, id, requestDto, getEmail(httpServletRequest));


        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 모든 게시물 불러오기, page 는 page 번호
    @GetMapping("{page}")
    public ResponseEntity<CommunityBaseResponseDto> techPostList(@PathVariable("page") Integer page) {
        CommunityBaseResponseDto responseDto = techPostService.getPostList(page);

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }
    
    // 검색어 관련 게시물 불러오기
    @GetMapping("search/{keyword}/{page}")
    public ResponseEntity<CommunityBaseResponseDto> findTechPosts(@PathVariable("keyword") String keyword,
                                                                  @PathVariable("page") Integer page) {
        CommunityBaseResponseDto responseDto = techPostService.searchPosts(keyword, page);

        return ResponseEntity.status(responseDto.getStatusCode())
                .body(responseDto);
    }

    // 게시물 상세화면
    @GetMapping(value = "detail/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<TechPostResponseDto> detailTechPost(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        TechPostResponseDto techPostDto = techPostService.getPost(id, getEmail(httpServletRequest));

        return ResponseEntity.ok()
                .body(techPostDto);
    }
    
    // 게시물 삭제
    @DeleteMapping("delete/{id}")
    public void techPostDelete(@PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
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