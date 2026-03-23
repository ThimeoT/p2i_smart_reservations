package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.model.Emprunt;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface EmpruntMapper {

    EmpruntResponseDto toDto(Emprunt emprunt);

    @Mapping(target = "id", ignore = true)
    Emprunt toEntity(EmpruntResponseDto empruntDto);

    Iterable<EmpruntResponseDto> toDtoIterable(Iterable<Emprunt> emprunts);

}
