package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.RelationEquipementDto;
import com.smart_reservation.api.model.RelationEquipement;
import org.mapstruct.Mapper;

@Mapper
public interface RelationEquipementMapper {

    RelationEquipement toEntity(RelationEquipementDto relationEquipementDto);

    RelationEquipementDto toDto(RelationEquipement relationEquipement);

    Iterable<RelationEquipementDto> toDtoIterable(Iterable<RelationEquipement> relationEquipements);

}
