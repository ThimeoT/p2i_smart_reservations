package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.ListeEquipementRequestDto;
import com.smart_reservation.api.dto.response.ListeEquipementResponseDto;
import com.smart_reservation.api.model.ListeEquipement;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper
public interface ListeEquipementMapper {

    ListeEquipement toEntity(ListeEquipementRequestDto listeEquipementResponseDto);

    ListeEquipementResponseDto toDto(ListeEquipement listeEquipement);

    Iterable<ListeEquipement> toDtoIterable(Iterable<ListeEquipementResponseDto> listeEquipementDto);

    ListeEquipement updateEntity(ListeEquipementRequestDto listeEquipementDto, @MappingTarget ListeEquipement listeEquipement);

}
