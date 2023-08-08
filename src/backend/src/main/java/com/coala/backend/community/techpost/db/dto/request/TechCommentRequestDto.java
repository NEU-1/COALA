package com.coala.backend.community.techpost.db.dto.request;

import com.coala.backend.community.techpost.db.entity.TechComment;
import com.coala.backend.community.techpost.db.entity.TechPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TechCommentRequestDto {
    private TechPost tpId;
    private String author;
    private String content;

    @Builder
    public TechCommentRequestDto(TechPost tpId, String author, String content) {
        this.tpId = tpId;
        this.author = author;
        this.content = content;
    }

    public TechComment toEntity() {
        return TechComment.builder()
                .tpId(this.tpId)
                .author(this.author)
                .content(this.content)
                .build();
    }
}
