package com.coala.backend.techpost.db.dto.response;

import com.coala.backend.techpost.db.entity.TechPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TechCommentResponseDto {
    private Long id;
    private TechPost fpId;
    private String author;
    private String content;
    private LocalDateTime createAt;

    @Builder
    public TechCommentResponseDto(Long id, TechPost fpId, String author, String content, LocalDateTime createAt) {
        this.id = id;
        this.fpId = fpId;
        this.author = author;
        this.content = content;
        this.createAt = createAt;
    }
}
