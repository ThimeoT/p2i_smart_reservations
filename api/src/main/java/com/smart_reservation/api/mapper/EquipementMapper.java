package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.EquipementDto;
import com.smart_reservation.api.dto.EquipementDtoReduit;
import com.smart_reservation.api.model.Equipement;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.mapstruct.Mapping;

@Mapper
public interface EquipementMapper {
    EquipementMapper INSTANCE = Mappers.getMapper(EquipementMapper.class);
    Equipement ToEntity(EquipementDto equipementDto);

    EquipementDto ToDto(Equipement equipement);

    @Mapping(target="exemplaires",ignore=true)
    @Mapping(target="relationsEquipement",ignore=true)
    @Mapping(target = "liensRessources",ignore = true)
    EquipementDtoReduit ToDtoReduit(EquipementDto equipementDto);

    @Mapping(target="exemplaires",ignore=true)
    @Mapping(target="relationsEquipement",ignore=true)
    @Mapping(target = "liensRessources",ignore = true)
    Iterable<EquipementDtoReduit>  toDtoReduitIterable(Iterable<Equipement> equipements);
    Iterable<EquipementDto>  toDtoReduit(Iterable<Equipement> equipements);
}
