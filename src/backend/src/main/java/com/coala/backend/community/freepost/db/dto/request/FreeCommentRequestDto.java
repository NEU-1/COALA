package com.coala.backend.community.freepost.db.dto.request;

import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.entity.FreeComment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class FreeCommentRequestDto {
    private FreePost fpId;
    private boolean anonymous;
    private String content;

    @Builder
    public FreeCommentRequestDto(FreePost fpId, boolean anonymous, String content) {
        this.fpId = fpId;
        this.anonymous = anonymous;
        this.content = content;
    }

    public FreeComment toEntity() {
        return FreeComment.builder()
                .fpId(this.fpId)
                .anonymous(this.anonymous)
                .content(this.content)
                .build();
    }
}
