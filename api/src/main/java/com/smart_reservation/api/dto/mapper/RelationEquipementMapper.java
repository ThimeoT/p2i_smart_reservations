package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.RelationEquipementRequestDto;
import com.smart_reservation.api.dto.response.RelationEquipementResponseDto;
import com.smart_reservation.api.model.RelationEquipement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface RelationEquipementMapper {

    @Mapping(target = "id", ignore = true)
    RelationEquipement toEntity(RelationEquipementRequestDto relationEquipementResponseDto);

    @Mapping(target = "equipementSourceId", source = "equipementSource.id")
    @Mapping(target = "equipementsCibleIds", expression = "java(relationEquipement.getEquipementsCible().stream().map(e -> e.getId()).collect(java.util.stream.Collectors.toList()))")
    RelationEquipementResponseDto toDto(RelationEquipement relationEquipement);

    @Mapping(target = "equipementsCible", qualifiedByName = "toResumeDto")
    @Mapping(target= "equipementSource", qualifiedByName = "toResumeDto")
    Iterable<RelationEquipementResponseDto> toDtoIterable(Iterable<RelationEquipement> relationEquipements);

    @Mapping(target = "id", ignore = true)
    @Mapping(target="equipementSource", ignore=true)
    @Mapping(target="equipementsCible",ignore=true)
    RelationEquipement updateEntity(RelationEquipementRequestDto relationEquipementDto, @MappingTarget RelationEquipement relationEquipement );
}
