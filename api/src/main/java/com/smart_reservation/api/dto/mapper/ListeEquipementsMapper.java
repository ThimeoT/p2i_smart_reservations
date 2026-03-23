package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.ListeEquipementsRequestDto;
import com.smart_reservation.api.dto.response.ListeEquipementsResponseDto;
import com.smart_reservation.api.model.ListeEquipements;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface ListeEquipementsMapper {

    @Mapping(target = "id", ignore = true)
    ListeEquipements toEntity(ListeEquipementsRequestDto listeEquipementResponseDto);

    ListeEquipementsResponseDto toDto(ListeEquipements listeEquipements);
    Iterable<ListeEquipementsResponseDto> toDtoIterable(Iterable<ListeEquipements> listeEquipement);
    @Mapping(target = "id", ignore = true)
    ListeEquipements updateEntity(ListeEquipementsRequestDto listeEquipementDto, @MappingTarget ListeEquipements listeEquipements);

}
