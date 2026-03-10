package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.EmpruntDto;
import com.smart_reservation.api.model.Emprunt;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EmpruntMapper {
    EmpruntMapper INSTANCE = Mappers.getMapper(EmpruntMapper.class);

    EmpruntDto ToDto(Emprunt emprunt);
    Emprunt ToEntity(EmpruntDto empruntDto);
    Iterable<EmpruntDto> ToDtoIterable(Iterable<Emprunt> emprunts);
}
