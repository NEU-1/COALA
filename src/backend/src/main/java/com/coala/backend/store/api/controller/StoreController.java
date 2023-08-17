package com.coala.backend.store.api.controller;

import com.coala.backend.member.api.service.MemberService;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.store.api.service.FileService;
import com.coala.backend.store.api.service.StoreService;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import com.coala.backend.store.db.dto.response.PostResponseDto;
import com.coala.backend.store.db.dto.response.StoreListDto;
import com.coala.backend.store.db.dto.response.StorePostResponseDto;
import com.coala.backend.store.db.entity.StorePost;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/*
    basic
        write O
        update O
        delete O
        read(detail) O
        read(list) O

    add
        Detail 페이지 -> 거래요청(채팅생성)
        이미지 추가
        좋아요 추가 O
        필터링(분류, 대여기간(기간별로), 대여료 기준 필터링, 대여 완료 상품 필터링도
        상태변경(채팅에서 거래하기 버튼 누르는 경우) => status 0으로 변경, 거래 완료 후 => -1로 비활성화 => 같은 명령 쏴주기만하면 상관 없음(알아서 체크)
*/


@RestController
@RequestMapping("/api/store")
public class StoreController {

    private StoreService storeService;
    private JwtTokenProvider jwtTokenProvider;
    private MemberService memberService;
    private FileService fileService;

    public StoreController(StoreService storeService, JwtTokenProvider jwtTokenProvider, MemberService memberService, FileService fileService) {
        this.storeService = storeService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberService = memberService;
        this.fileService = fileService;
    }

    @PostMapping("/list")
    public ListResponseDto list (@RequestParam Integer page, @RequestBody Map<String, String> info, HttpServletRequest request){
        return storeService.list(page, info, jwtTokenProvider.getMail(request));
    }

    @GetMapping("/detail")
    public PostResponseDto detail(@RequestParam(value = "id") Long id, HttpServletRequest request){
        storeService.views(id);
        return storeService.detail(id, jwtTokenProvider.getMail(request));
    }

    @PostMapping(value = "/write", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<? extends BaseResponseDto> write(@RequestParam("json") String json, HttpServletRequest request, @RequestParam("multipartFile") List<MultipartFile> files) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        StorePost storePost = objectMapper.readValue(json, StorePost.class);

        StorePostResponseDto storePostResponseDto = storeService.write(storePost, memberService.loadInfo(jwtTokenProvider.getMail(request)).getMember());
        BaseResponseDto baseResponseDto = storePostResponseDto.getBaseResponseDto();
        Long id = storePostResponseDto.getStorePost().getId();

        fileService.delete(id, "store");

        for(int i = 0; i < files.size(); i++){
            fileService.file(files.get(i), "store", id,i+1);
        }
        return ResponseEntity.status(baseResponseDto.getStatusCode()).body(baseResponseDto);
    }

    @PutMapping("/update")
    public ResponseEntity<? extends BaseResponseDto> update(@RequestParam("json") String json, @RequestParam(value = "id")Long id,
                                                            HttpServletRequest request, @RequestParam("multipartFile") List<MultipartFile> files) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        StorePost storePost = objectMapper.readValue(json, StorePost.class);

        BaseResponseDto responseDto = storeService.update(id, storePost, jwtTokenProvider.getMail(request));

        fileService.delete(id, "store");

        for(int i = 0; i < files.size(); i++){
            fileService.file(files.get(i), "store", id,i+1);
        }

        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<? extends BaseResponseDto> delete(@RequestParam(value="id") Long id, HttpServletRequest request) throws Exception{
        fileService.delete(id, "store");
        BaseResponseDto responseDto = storeService.delete(id, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @PostMapping("/like")
    public ResponseEntity<? extends BaseResponseDto> like(@RequestParam(value = "id") Long id, HttpServletRequest request){
        BaseResponseDto responseDto = storeService.like(id, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @PutMapping("/status")
    public ResponseEntity<? extends BaseResponseDto> status(@RequestParam(value = "id") Long id, HttpServletRequest request){
        BaseResponseDto responseDto = storeService.status(id, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @GetMapping("/valid")
    public ResponseEntity<? extends PostResponseDto> valid(@RequestParam(value = "id") Long id, HttpServletRequest request){
        PostResponseDto postResponseDto = storeService.valid(id, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(postResponseDto.getBaseResponseDto().getStatusCode()).body(postResponseDto);
    }


}
