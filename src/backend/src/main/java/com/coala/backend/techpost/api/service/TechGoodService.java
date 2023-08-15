package com.coala.backend.techpost.api.service;


import com.coala.backend.techpost.db.dto.request.TechGoodRequestDto;

public interface TechGoodService {
    public void good(TechGoodRequestDto techGoodRequestDto);
    public void unGood(TechGoodRequestDto techGoodRequestDto);
}
