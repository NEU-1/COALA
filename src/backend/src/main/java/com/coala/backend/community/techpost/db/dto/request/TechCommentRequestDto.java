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
    private boolean isAnonymous;
    private String content;

    @Builder
    public TechCommentRequestDto(TechPost tpId, boolean isAnonymous, String content) {
        this.tpId = tpId;
        this.isAnonymous = isAnonymous;
        this.content = content;
    }

    public TechComment toEntity() {
        return TechComment.builder()
                .tpId(this.tpId)
                .isAnonymous(this.isAnonymous)
                .content(this.content)
                .build();
    }
}
