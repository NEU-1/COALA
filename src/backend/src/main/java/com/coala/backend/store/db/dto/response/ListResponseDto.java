package com.coala.backend.store.db.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class ListResponseDto {

    private List<?> list;

    private Integer size;
}