package com.coala.backend.techpost.db.dto.response;

import com.coala.backend.techpost.db.entity.TechPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TechCommentResponseDto {
    private TechPost tpId;
    private String author;
    private String content;
    private LocalDateTime createAt;

    @Builder
    public TechCommentResponseDto(TechPost tpId, String author, String content, LocalDateTime createAt) {
        this.tpId = tpId;
        this.author = author;
        this.content = content;
        this.createAt = createAt;
    }
}
