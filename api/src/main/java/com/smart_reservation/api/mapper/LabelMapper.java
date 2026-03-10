package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.LabelDto;
import com.smart_reservation.api.model.Label;
import org.mapstruct.Mapper;

@Mapper
public interface LabelMapper {

    Label toEntity(LabelDto labelDto);

    LabelDto toDto(Label label);

    Iterable<LabelDto> toDtoIterable(Iterable<Label> labels);

}
