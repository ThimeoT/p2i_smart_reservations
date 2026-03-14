package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.LabelResponseDto;
import com.smart_reservation.api.model.Label;
import org.mapstruct.Mapper;

@Mapper
public interface LabelMapper {

    Label toEntity(LabelResponseDto labelResponseDto);

    LabelResponseDto toDto(Label label);

    Iterable<LabelResponseDto> toDtoIterable(Iterable<Label> labels);

}
