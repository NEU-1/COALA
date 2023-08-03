package com.coala.backend.freepost.db.dto.response;

import com.coala.backend.freepost.db.entity.FreePost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class FreeCommentResponseDto {
    private Long id;
    private FreePost fpId;
    private String author;
    private String content;
    private LocalDateTime createAt;

    @Builder
    public FreeCommentResponseDto(Long id, FreePost fpId, String author, String content, LocalDateTime createAt) {
        this.id = id;
        this.fpId = fpId;
        this.author = author;
        this.content = content;
        this.createAt = createAt;
    }
}
