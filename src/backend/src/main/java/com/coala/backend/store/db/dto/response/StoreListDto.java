package com.coala.backend.store.db.dto.response;

import com.coala.backend.store.db.entity.StoreImage;
import com.coala.backend.store.db.entity.StorePost;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StoreListDto {
    private StorePost storePost;
    private boolean mine;
    private boolean like;
    private List<StoreImage> storeImageList;
}
