package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.ListeEquipementDto;
import com.smart_reservation.api.model.ListeEquipement;
import org.mapstruct.Mapper;

@Mapper
public interface ListeEquipementMapper {

    ListeEquipement toEntity(ListeEquipementDto listeEquipementDto);

    ListeEquipementDto toDto(ListeEquipement listeEquipement);

    Iterable<ListeEquipement> toDtoIterable(Iterable<ListeEquipementDto> listeEquipementDto);
}
