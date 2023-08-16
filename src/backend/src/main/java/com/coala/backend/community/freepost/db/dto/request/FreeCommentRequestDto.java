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
    private boolean isAnonymous;
    private String content;

    @Builder
    public FreeCommentRequestDto(FreePost fpId, boolean isAnonymous, String content) {
        this.fpId = fpId;
        this.isAnonymous = isAnonymous;
        this.content = content;
    }

    public FreeComment toEntity() {
        return FreeComment.builder()
                .fpId(this.fpId)
                .isAnonymous(this.isAnonymous)
                .content(this.content)
                .build();
    }
}
