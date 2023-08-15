package com.coala.backend.store.api.controller;

import com.coala.backend.member.api.service.MemberService;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.store.api.service.StoreService;
import com.coala.backend.store.db.dto.response.PostResponseDto;
import com.coala.backend.store.db.entity.StorePost;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    public StoreController(StoreService storeService, JwtTokenProvider jwtTokenProvider, MemberService memberService) {
        this.storeService = storeService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberService = memberService;
    }

    @PostMapping("/list")
    public List<StorePost> list (@RequestParam Integer page, @RequestBody Map<String, String> info){
        return storeService.list(page, info);
    }

    @GetMapping("/detail")
    public PostResponseDto detail(@RequestParam(value = "id") Long id){
        storeService.views(id);
        return storeService.detail(id);
    }

    @PostMapping("/write")
    public ResponseEntity<? extends BaseResponseDto> write(@RequestBody Map<String, String> info, HttpServletRequest request){
        BaseResponseDto baseResponseDto = storeService.write(info, memberService.loadInfo(jwtTokenProvider.getMail(request)).getMember());
        return ResponseEntity.status(baseResponseDto.getStatusCode()).body(baseResponseDto);
    }

    @PutMapping("/update")
    public ResponseEntity<? extends BaseResponseDto> update(@RequestBody Map<String, String> info, @RequestParam(value = "id")Long id,
                                                            HttpServletRequest request){
        BaseResponseDto responseDto = storeService.update(id, info, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<? extends BaseResponseDto> delete(@RequestParam(value="id") Long id, HttpServletRequest request){
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

}
