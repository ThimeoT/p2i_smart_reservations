package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.EquipementDto;
import com.smart_reservation.api.dto.EquipementDtoReduit;
import com.smart_reservation.api.model.Equipement;
import org.mapstruct.Mapper;

@Mapper
public interface EquipementMapper {

    Equipement toEntity(EquipementDto equipementDto);

    EquipementDto toDto(Equipement equipement);

    EquipementDtoReduit toDtoReduit(Equipement equipement);

    Iterable<EquipementDtoReduit> toDtoReduitIterable(Iterable<Equipement> equipements);

    Iterable<EquipementDto> toDtoReduit(Iterable<Equipement> equipements);
}
