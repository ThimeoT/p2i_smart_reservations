package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.ExemplaireRequestDto;
import com.smart_reservation.api.dto.response.ExemplaireResponseDto;
import com.smart_reservation.api.model.Exemplaire;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper
public interface ExemplaireMapper {

    @Mapping(target = "equipement", ignore = true)
    Exemplaire toEntity(ExemplaireRequestDto exemplaireDto);

    @Named("toDto")
    ExemplaireResponseDto toDto(Exemplaire exemplaire);

    Iterable<Exemplaire> toDtoIterable(Iterable<Exemplaire> exemplaires);

    @Mapping(target="id", ignore=true)
    @Mapping(target = "equipement", ignore = true)
    Exemplaire updateToEntity(ExemplaireRequestDto exemplaireRequestDto, @MappingTarget  Exemplaire exemplaire);
}
