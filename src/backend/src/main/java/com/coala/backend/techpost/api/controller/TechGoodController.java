package com.coala.backend.techpost.api.controller;

import com.coala.backend.techpost.api.service.TechGoodServiceImpl;
import com.coala.backend.techpost.db.dto.request.TechGoodRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/tech/post/")
public class TechGoodController {
    private final TechGoodServiceImpl techGoodService;

    @PostMapping("is/good")
    public ResponseEntity good(@RequestBody @Valid TechGoodRequestDto techGoodRequestDto) {

        techGoodService.good(techGoodRequestDto);
        return ResponseEntity.ok()
                .header("200", "성공")
                .build();
    }

    @DeleteMapping("un/good")
    public ResponseEntity unGood(@RequestBody @Valid TechGoodRequestDto techGoodRequestDto) {
        techGoodService.unGood(techGoodRequestDto);
        return ResponseEntity.ok()
                .header("200", "성공")
                .build();
    }
}
