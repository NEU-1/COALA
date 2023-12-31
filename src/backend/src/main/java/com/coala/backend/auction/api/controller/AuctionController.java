package com.coala.backend.auction.api.controller;

import com.coala.backend.auction.api.service.ApplyFileService;
import com.coala.backend.auction.api.service.AuctionService;
import com.coala.backend.auction.db.dto.response.ApplySetResponseDto;
import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.auction.db.entity.AuctionPost;
import com.coala.backend.member.api.service.MemberService;
import com.coala.backend.member.common.jwt.JwtTokenProvider;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.auction.db.dto.response.PostResponseDto;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import com.coala.backend.store.db.entity.StorePost;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auction")
public class AuctionController {

    private AuctionService auctionService;

    private JwtTokenProvider jwtTokenProvider;

    private MemberService memberService;

    private ApplyFileService applyFileService;

    public AuctionController(AuctionService auctionService, JwtTokenProvider jwtTokenProvider, MemberService memberService, ApplyFileService applyFileService) {
        this.auctionService = auctionService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberService = memberService;
        this.applyFileService = applyFileService;
    }

    @PostMapping("/list")
    public ListResponseDto list (@RequestParam Integer page, @RequestBody Map<String, String> info){
        return auctionService.list(page, info);
    }

    @GetMapping("/detail")
    public PostResponseDto detail(@RequestParam(value = "id") Long id, HttpServletRequest request){
        auctionService.views(id);
        return auctionService.detail(id, jwtTokenProvider.getMail(request));
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
    public ResponseEntity<? extends BaseResponseDto> apply(@RequestParam(value = "id") Long id,
                                                           @RequestParam("json") String json,
                                                           @RequestPart("multipartFile") List<MultipartFile> files,
                                                           HttpServletRequest request)
    throws Exception{
        System.out.println("hello");
        ObjectMapper objectMapper = new ObjectMapper();
        AuctionApply auctionApply = objectMapper.readValue(json, AuctionApply.class);

        ApplySetResponseDto applySetResponseDto = auctionService.apply(id, auctionApply, jwtTokenProvider.getMail(request));

        BaseResponseDto baseResponseDto = applySetResponseDto.getBaseResponseDto();

        Long idx = applySetResponseDto.getAuctionApply().getId();

        for(int i = 0; i < files.size(); i++){
            applyFileService.file(files.get(i), "auction", id, idx, i+1);
        }

        return ResponseEntity.status(baseResponseDto.getStatusCode()).body(baseResponseDto);
    }

    @PutMapping("/status")
    public ResponseEntity<? extends BaseResponseDto> status(@RequestParam(value = "id") Long id, HttpServletRequest request){
        BaseResponseDto responseDto = auctionService.status(id, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(responseDto.getStatusCode()).body(responseDto);
    }

    @GetMapping("/valid")
    public ResponseEntity<? extends PostResponseDto> valid(@RequestParam(value = "id") Long id, HttpServletRequest request){
        PostResponseDto postResponseDto = auctionService.valid(id, jwtTokenProvider.getMail(request));
        return ResponseEntity.status(postResponseDto.getBaseResponseDto().getStatusCode()).body(postResponseDto);
    }
}
