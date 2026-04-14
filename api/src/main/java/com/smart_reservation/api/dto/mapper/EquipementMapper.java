package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.EquipementRequestDto;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.model.Equipement;
import org.mapstruct.*;

@Mapper(uses = {LabelMapper.class,ExemplaireMapper.class, RelationEquipementMapper.class })
public interface EquipementMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "labels", ignore=true)
    @Mapping(target="exemplaires", ignore=true)
    @Mapping(target="relationsEquipement", ignore=true)
    Equipement toEntity(EquipementRequestDto equipementRequestDto);

    @Named("toDto")
    @Mapping(target = "relationsEquipement", qualifiedByName = "toDto")
    @Mapping(target = "labels", qualifiedByName = "toDto")
    @Mapping(target = "exemplaires", qualifiedByName = "toDto")
    EquipementResponseDto toDto(Equipement equipement);

    @Named("toResumeDto")
    EquipementResumeDto toResumeDto(Equipement equipement);

    @Named("toResumeDtoIterable")
    @IterableMapping(qualifiedByName = "toResumeDto")
    Iterable<EquipementResumeDto> toResumeDtoIterable(Iterable<Equipement> equipements);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "labels", ignore = true)
    @Mapping(target = "exemplaires", ignore = true)
    Equipement updateToEntity(EquipementRequestDto equipementRequestDto, @MappingTarget Equipement equipement);
}
