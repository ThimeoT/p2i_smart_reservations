package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.EmpruntDto;
import com.smart_reservation.api.model.Emprunt;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EmpruntMapper {

    EmpruntDto toDto(Emprunt emprunt);

    Emprunt toEntity(EmpruntDto empruntDto);

    Iterable<EmpruntDto> toDtoIterable(Iterable<Emprunt> emprunts);
}
