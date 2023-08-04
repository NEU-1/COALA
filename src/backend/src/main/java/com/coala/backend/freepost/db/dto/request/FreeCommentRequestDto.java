package com.coala.backend.freepost.db.dto.request;

import com.coala.backend.freepost.db.entity.FreeComment;
import com.coala.backend.freepost.db.entity.FreePost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class FreeCommentRequestDto {
    private Long id;
    private FreePost fpId;
    private String author;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @Builder
    public FreeCommentRequestDto(Long id, FreePost fpId, String author, String content,
                                 LocalDateTime createAt, LocalDateTime updateAt) {
        this.id = id;
        this.fpId = fpId;
        this.author = author;
        this.content = content;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    public FreeComment toEntity() {
        return FreeComment.builder()
                .fpId(this.fpId)
                .author(this.author)
                .content(this.content)
                .build();
    }
}
