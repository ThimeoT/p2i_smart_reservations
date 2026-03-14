package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.model.Equipement;
import org.mapstruct.Mapper;

@Mapper
public interface EquipementMapper {

    Equipement toEntity(EquipementResponseDto equipementResponseDto);

    EquipementResponseDto toDto(Equipement equipement);

    EquipementResumeDto toDtoReduit(Equipement equipement);

    Iterable<EquipementResumeDto> toDtoReduitIterable(Iterable<Equipement> equipements);

    Iterable<EquipementResponseDto> toDtoReduit(Iterable<Equipement> equipements);
}
