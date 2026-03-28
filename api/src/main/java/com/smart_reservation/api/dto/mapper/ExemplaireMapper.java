package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.ExemplaireRequestDto;
import com.smart_reservation.api.dto.response.ExemplaireResponseDto;
import com.smart_reservation.api.model.Exemplaire;
import org.mapstruct.*;

@Mapper
public interface ExemplaireMapper {

    @Mapping(target = "equipement", ignore = true)
    @Mapping(target = "emprunts", ignore = true)
    Exemplaire toEntity(ExemplaireRequestDto exemplaireDto);

    @Named("toDto")
    ExemplaireResponseDto toDto(Exemplaire exemplaire);

    @IterableMapping(qualifiedByName = "toDto")
    Iterable<ExemplaireResponseDto> toDtoIterable(Iterable<Exemplaire> exemplaires);

    @Mapping(target="id", ignore=true)
    @Mapping(target = "equipement", ignore = true)
    @Mapping(target="emprunts", ignore = true)
    Exemplaire updateToEntity(ExemplaireRequestDto exemplaireRequestDto, @MappingTarget  Exemplaire exemplaire);
}
