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

    RelationEquipementResponseDto toDto(RelationEquipement relationEquipement);

    Iterable<RelationEquipementResponseDto> toDtoIterable(Iterable<RelationEquipement> relationEquipements);

    @Mapping(target = "id", ignore = true)
    RelationEquipement updateEntity(RelationEquipementRequestDto relationEquipementDto, @MappingTarget RelationEquipement relationEquipement );
}
