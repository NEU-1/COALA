package com.coala.backend.auction.api.controller;

import com.coala.backend.auction.api.service.AuctionService;
import com.coala.backend.auction.db.entity.AuctionPost;
import com.coala.backend.member.api.service.MemberService;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.auction.db.dto.response.PostResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auction")
public class AuctionController {

    private AuctionService auctionService;

    private JwtTokenProvider jwtTokenProvider;

    private MemberService memberService;

    public AuctionController(AuctionService auctionService, JwtTokenProvider jwtTokenProvider, MemberService memberService) {
        this.auctionService = auctionService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberService = memberService;
    }

    @PostMapping("/list")
    public List<AuctionPost> list (@RequestParam Integer page, @RequestBody Map<String, String> info){
        return auctionService.list(page, info);
    }

    @GetMapping("/detail")
    public PostResponseDto detail(@RequestParam(value = "id") Long id){
        auctionService.views(id);
        return auctionService.detail(id);
    }

    @PostMapping("/write")
    public ResponseEntity<? extends BaseResponseDto> write(@RequestBody Map<String, String> info, HttpServletRequest request){
        BaseResponseDto baseResponseDto = auctionService.write(info, memberService.loadInfo(jwtTokenProvider.getMail(request)).getMember());
        return ResponseEntity.status(baseResponseDto.getStatusCode()).body(baseResponseDto);
    }

    @PutMapping("/update")
    public ResponseEntity<? extends BaseResponseDto> update(@RequestBody Map<String, String> info, @RequestParam(value = "id")Long id,
                                                            HttpServletRequest request){
        BaseResponseDto responseDto = auctionService.update(id, info, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<? extends BaseResponseDto> delete(@RequestParam(value="id") Long id, HttpServletRequest request){
        BaseResponseDto responseDto = auctionService.delete(id, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @PostMapping("/apply")
    public ResponseEntity<? extends BaseResponseDto> apply(@RequestParam(value = "id") Long id, @RequestBody Map<String, String> info, HttpServletRequest request){
        BaseResponseDto responseDto = auctionService.apply(id, info, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @PutMapping("/status")
    public ResponseEntity<? extends BaseResponseDto> status(@RequestParam(value = "id") Long id, HttpServletRequest request){
        BaseResponseDto responseDto = auctionService.status(id, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }
}
