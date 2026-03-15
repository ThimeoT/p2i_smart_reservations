package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.model.Emprunt;
import org.mapstruct.Mapper;

@Mapper
public interface EmpruntMapper {

    EmpruntResponseDto toDto(Emprunt emprunt);

    Emprunt toEntity(EmpruntResponseDto empruntDto);

    Iterable<EmpruntResponseDto> toDtoIterable(Iterable<Emprunt> emprunts);

}
