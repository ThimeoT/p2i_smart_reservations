package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.ListeEquipementsRequestDto;
import com.smart_reservation.api.dto.response.ListeEquipementsResponseDto;
import com.smart_reservation.api.model.ListeEquipements;
import org.mapstruct.*;

@Mapper(uses = EquipementMapper.class)
public interface ListeEquipementsMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "equipements", ignore = true)
    ListeEquipements toEntity(ListeEquipementsRequestDto listeEquipementResponseDto);

    @Named("toDto")
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "equipements", qualifiedByName = "toResumeDto")
    ListeEquipementsResponseDto toDto(ListeEquipements listeEquipements);

    @IterableMapping(qualifiedByName = "toDto")
    Iterable<ListeEquipementsResponseDto> toDtoIterable(Iterable<ListeEquipements> listeEquipement);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "equipements", ignore = true)
    ListeEquipements updateEntity(ListeEquipementsRequestDto listeEquipementDto, @MappingTarget ListeEquipements listeEquipements);

}
