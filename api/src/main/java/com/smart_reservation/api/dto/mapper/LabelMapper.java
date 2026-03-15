package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.LabelRequestDto;
import com.smart_reservation.api.dto.response.LabelResponseDto;
import com.smart_reservation.api.model.Label;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper
public interface LabelMapper {

    Label toEntity(LabelRequestDto labelRequestDto);

    LabelResponseDto toDto(Label label);

    Iterable<LabelResponseDto> toDtoIterable(Iterable<Label> labels);

    Label updateEntity(LabelRequestDto labelRequestDto, @MappingTarget Label label);

}
