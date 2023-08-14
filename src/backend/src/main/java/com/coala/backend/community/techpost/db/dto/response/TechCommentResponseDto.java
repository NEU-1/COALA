package com.coala.backend.community.techpost.db.dto.response;

import com.coala.backend.community.techpost.db.entity.TechPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TechCommentResponseDto {
    private Long id;
    private Long tpId;
    private String content;
    private String nickname;
    private boolean isAnonymous;
    private boolean mine;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @Builder
    public TechCommentResponseDto(Long id, Long tpId, boolean isAnonymous, String content, boolean mine,
                                  String nickname, LocalDateTime createAt, LocalDateTime updateAt) {
        this.id = id;
        this.tpId = tpId;
        this.isAnonymous = isAnonymous;
        this.content = content;
        this.nickname = nickname;
        this.mine = mine;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}
