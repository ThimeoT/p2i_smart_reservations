package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.ExemplaireResponseDto;
import com.smart_reservation.api.model.Exemplaire;
import org.mapstruct.Mapper;

@Mapper
public interface ExemplaireMapper {

    Exemplaire toEntity(ExemplaireResponseDto exemplaireDto);

    ExemplaireResponseDto toDto(Exemplaire exemplaire);

    Iterable<Exemplaire> toDtoIterable(Iterable<Exemplaire> exemplaires);

}
