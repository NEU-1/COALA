package com.coala.backend.freepost.api.service;

import com.coala.backend.freepost.db.dto.request.FreeGoodRequestDto;

public interface FreeGoodService {
    public void good(FreeGoodRequestDto freeGoodRequestDto);
    public void unGood(FreeGoodRequestDto freeGoodRequestDto);
}
