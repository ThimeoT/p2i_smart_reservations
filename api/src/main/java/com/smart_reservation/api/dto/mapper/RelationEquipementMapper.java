package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.RelationEquipementRequestDto;
import com.smart_reservation.api.dto.response.RelationEquipementResponseDto;
import com.smart_reservation.api.model.RelationEquipement;
import jdk.jfr.Name;
import org.mapstruct.*;

@Mapper(uses = EquipementMapper.class )
public interface RelationEquipementMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "equipementSource", ignore = true)
    @Mapping(target = "equipementsCible", ignore = true)
    RelationEquipement toEntity(RelationEquipementRequestDto relationEquipementResponseDto);

    @Named("toDto")
    @Mapping(target = "equipementSourceId", source = "equipementSource.id")
    RelationEquipementResponseDto toDto(RelationEquipement relationEquipement);

    @IterableMapping(qualifiedByName = "toDto")
    Iterable<RelationEquipementResponseDto> toDtoIterable(Iterable<RelationEquipement> relationEquipements);

    @Mapping(target = "id", ignore = true)
    @Mapping(target="equipementSource", ignore=true)
    @Mapping(target="equipementsCible",ignore=true)
    RelationEquipement updateEntity(RelationEquipementRequestDto relationEquipementDto, @MappingTarget RelationEquipement relationEquipement );
}
