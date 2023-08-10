package com.coala.backend.community.techpost.api.service;

import com.coala.backend.community.techpost.db.entity.TechImage;
import com.coala.backend.community.techpost.db.repository.TechImageRepository;
import com.coala.backend.s3.S3UploadService;
import com.coala.backend.community.common.dto.CommunityBaseResponseDto;
import com.coala.backend.community.techpost.db.dto.request.TechPostRequestDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.community.techpost.db.dto.response.TechPostResponseDto;
import com.coala.backend.community.techpost.db.entity.TechPost;
import com.coala.backend.community.techpost.db.repository.TechGoodRepository;
import com.coala.backend.community.techpost.db.repository.TechPostRepository;
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
import java.util.StringTokenizer;
import java.util.stream.Collectors;

/*
 자유게시판 기능 구현 Impl 입니다.

* */

@Slf4j
@Service
@RequiredArgsConstructor
public class TechPostServiceImpl implements TechPostService{
    private final TechPostRepository techPostRepository;
    private final TechGoodRepository techGoodRepository;
    private final TechImageRepository techImageRepository;

    private final S3UploadService s3UploadService;

    static String str = "https://coala.s3.ap-northeast-2.amazonaws.com/Tech/";

    @Transactional
    @Override
    public CommunityBaseResponseDto savePost(List<MultipartFile> multipartFiles, TechPostRequestDto postDto, Member member) throws IOException {
        TechPost techPost = TechPost.builder()
                .memberId(member)
                .title(postDto.getTitle())
                .detail(postDto.getDetail())
                .nickname(postDto.getNickname())
                .build();

        techPostRepository.saveAndFlush(techPost);

        if (!multipartFiles.isEmpty()) {
            for (int i = 0; i < multipartFiles.size(); i++) {
                String storedFileName = s3UploadService.S3Upload(multipartFiles.get(i), "Tech");
                if (storedFileName.equals("사진없음")) break;

                techImageRepository.save(TechImage.builder()
                        .imagePath(storedFileName.substring(str.length()))
                        .tpId(techPost)
                        .build());
            }
            log.info("TechImage 업로드 성공");
        }

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 게시글 Id 반환")
                .id(techPost.getId())
                .build();
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto getPostList(int page) {
        Pageable pageable = PageRequest.of(page,7, Sort.by("createAt").descending().and(Sort.by("updateAt")));

        List <TechPostResponseDto> allList = techPostRepository.findAll(pageable).stream()
                .map(techPost -> TechPostResponseDto.builder()
                        .id(techPost.getId())
                        .memberId(techPost.getMemberId())
                        .title(techPost.getTitle())
                        .detail(techPost.getDetail())
                        .createAt(techPost.getCreateAt())
                        .updateAt(techPost.getUpdateAt())
                        .views(techPost.getViews())
                        .commentCount(techPost.getComments().size())
                        .goodCount(techPost.getGoods().size())
                        .build())
                .collect(Collectors.toList());

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 전체 페이지 수 & 해당 페이지 글 목록")
                .detail(1 + (allList.size() / 8))
                .list(allList)
                .build();
    }

    @Transactional
    @Override
    public TechPostResponseDto getPost(Long id) {
        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("없는 게시글 입니다.");
        });

        techPost.views();

        List<String> uri = new ArrayList<>();
        List<TechImage> imageList = techImageRepository.findByTpId(techPost);
        for (int i = 0; i < imageList.size(); i++) {
            TechImage techImage = imageList.get(i);
            uri.add(str + techImage.getImagePath());
        }

        return TechPostResponseDto.builder()
                .id(techPost.getId())
                .memberId(techPost.getMemberId())
                .title(techPost.getTitle())
                .detail(techPost.getDetail())
                .createAt(techPost.getCreateAt())
                .updateAt(techPost.getUpdateAt())
                .imagePath(uri)
                .views(techPost.getViews())
                .commentCount(techPost.getComments().size())
                .goodCount(techPost.getGoods().size())
                .build();
    }

    @Transactional
    @Override
    public void deletePost(Long id, Member member) {
        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("게시판이 존재하지 않습니다.");
        });

        if (!techPost.getMemberId().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }

        techImageRepository.findByTpId(techPost);
        techGoodRepository.deleteByTpId(techPost);
        techPostRepository.deleteById(id);
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto searchPosts(String keyword, int page) {
        Pageable pageable = PageRequest.of(page,7, Sort.by("createAt").descending().and(Sort.by("updateAt")));

        List<TechPostResponseDto> searchList = techPostRepository.findByTitleContaining(keyword, pageable).stream()
                .map(techPost -> TechPostResponseDto.builder()
                        .id(techPost.getId())
                        .memberId(techPost.getMemberId())
                        .title(techPost.getTitle())
                        .detail(techPost.getDetail())
                        .createAt(techPost.getCreateAt())
                        .updateAt(techPost.getUpdateAt())
                        .views(techPost.getViews())
                        .commentCount(techPost.getComments().size())
                        .goodCount((techPost.getGoods().size()))
                        .build())
                .collect(Collectors.toList());

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 전체 페이지 수 & 해당 페이지 글 목록")
                .detail(1 + searchList.size() / 8)
                .list(searchList)
                .build();
    }

    @Transactional
    @Override
    public CommunityBaseResponseDto updateTechPost(List<MultipartFile> multipartFile, Long id, TechPostRequestDto dto, Member member) throws IOException {
        TechPost techPost = techPostRepository.findById(id).orElseThrow(() -> {
            return  new IllegalArgumentException("게시글이 존재하지 않습니다.");
        });

        if (!techPost.getMemberId().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }

        techPost.updateTechPost(
                dto.getTitle(),
                dto.getDetail(),
                dto.getNickname());
        techPostRepository.save(techPost);

        return CommunityBaseResponseDto.builder()
                .statusCode(200)
                .msg("성공, 게시글 Id 반환")
                .id(id)
                .build();
    }
}
