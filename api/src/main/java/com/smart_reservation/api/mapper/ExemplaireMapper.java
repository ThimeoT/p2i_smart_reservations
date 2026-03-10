package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.ExemplaireDto;
import com.smart_reservation.api.model.Exemplaire;
import org.mapstruct.Mapper;

@Mapper
public interface ExemplaireMapper {

    Exemplaire toEntity(ExemplaireDto exemplaireDto);

    ExemplaireDto toDto(Exemplaire exemplaire);

    Iterable<Exemplaire> toDtoIterable(Iterable<Exemplaire> exemplaires);

}
