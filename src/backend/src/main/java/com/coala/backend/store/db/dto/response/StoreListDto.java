package com.coala.backend.store.db.dto.response;

import com.coala.backend.store.db.entity.StorePost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StoreListDto {
    private StorePost storePost;

    private boolean like;
}
