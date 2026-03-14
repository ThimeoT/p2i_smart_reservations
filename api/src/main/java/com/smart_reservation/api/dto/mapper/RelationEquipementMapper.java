package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.RelationEquipementResponseDto;
import com.smart_reservation.api.model.RelationEquipement;
import org.mapstruct.Mapper;

@Mapper
public interface RelationEquipementMapper {

    RelationEquipement toEntity(RelationEquipementResponseDto relationEquipementResponseDto);

    RelationEquipementResponseDto toDto(RelationEquipement relationEquipement);

    Iterable<RelationEquipementResponseDto> toDtoIterable(Iterable<RelationEquipement> relationEquipements);

}
