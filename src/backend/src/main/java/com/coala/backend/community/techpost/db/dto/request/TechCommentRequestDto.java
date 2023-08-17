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
    private boolean anonymous;
    private String content;

    @Builder
    public TechCommentRequestDto(TechPost tpId, boolean anonymous, String content) {
        this.tpId = tpId;
        this.anonymous = anonymous;
        this.content = content;
    }

    public TechComment toEntity() {
        return TechComment.builder()
                .tpId(this.tpId)
                .anonymous(this.anonymous)
                .content(this.content)
                .build();
    }
}
