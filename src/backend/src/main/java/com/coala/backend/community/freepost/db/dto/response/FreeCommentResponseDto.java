package com.coala.backend.community.freepost.db.dto.response;

import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.member.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class FreeCommentResponseDto {
    private Long id;
    private Long fpId;
    private String nickname;
    private String content;
    private boolean mine;
    private boolean isAnonymous;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @Builder
    public FreeCommentResponseDto(Long id, Long fpId, String nickname, String content, boolean mine,
                                  boolean isAnonymous, LocalDateTime createAt, LocalDateTime updateAt) {
        this.id = id;
        this.fpId = fpId;
        this.nickname = nickname;
        this.content = content;
        this.isAnonymous = isAnonymous;
        this.mine = mine;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}
