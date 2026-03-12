package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.ListeEquipementResponseDto;
import com.smart_reservation.api.model.ListeEquipement;
import org.mapstruct.Mapper;

@Mapper
public interface ListeEquipementMapper {

    ListeEquipement toEntity(ListeEquipementResponseDto listeEquipementResponseDto);

    ListeEquipementResponseDto toDto(ListeEquipement listeEquipement);

    Iterable<ListeEquipement> toDtoIterable(Iterable<ListeEquipementResponseDto> listeEquipementDto);
}
