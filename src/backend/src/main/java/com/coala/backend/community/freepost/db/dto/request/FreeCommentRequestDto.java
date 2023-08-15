package com.coala.backend.community.freepost.db.dto.request;

import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.entity.FreeComment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class FreeCommentRequestDto {
    private FreePost fpId;
    private String author;
    private String content;

    @Builder
    public FreeCommentRequestDto(FreePost fpId, String author, String content) {
        this.fpId = fpId;
        this.author = author;
        this.content = content;
    }

    public FreeComment toEntity() {
        return FreeComment.builder()
                .fpId(this.fpId)
                .author(this.author)
                .content(this.content)
                .build();
    }
}
