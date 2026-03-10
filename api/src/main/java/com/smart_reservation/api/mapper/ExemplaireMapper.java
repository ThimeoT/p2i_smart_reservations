package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.ExemplaireDto;
import com.smart_reservation.api.model.Exemplaire;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ExemplaireMapper {
    ExemplaireMapper INSTANCE = Mappers.getMapper(ExemplaireMapper.class);

    Exemplaire ToEntity(ExemplaireDto exemplaireDto);
    ExemplaireDto ToDto(Exemplaire exemplaire);
    Iterable<Exemplaire> ToIterableDto(Iterable<Exemplaire> exemplaires);

}
