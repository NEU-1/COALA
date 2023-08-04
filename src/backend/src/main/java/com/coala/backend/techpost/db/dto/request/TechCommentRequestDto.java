package com.coala.backend.techpost.db.dto.request;

import com.coala.backend.techpost.db.entity.TechComment;
import com.coala.backend.techpost.db.entity.TechPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TechCommentRequestDto {
    private Long id;
    private TechPost fpId;
    private String author;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @Builder
    public TechCommentRequestDto(Long id, TechPost fpId, String author, String content,
                                 LocalDateTime createAt, LocalDateTime updateAt) {
        this.id = id;
        this.fpId = fpId;
        this.author = author;
        this.content = content;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    public TechComment toEntity() {
        return TechComment.builder()
                .fpId(this.fpId)
                .author(this.author)
                .updateAt(this.updateAt)
                .content(this.content)
                .build();
    }
}
