package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.EquipementRequestDto;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.model.Equipement;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper
public interface EquipementMapper {

    Equipement toEntity(EquipementRequestDto equipementRequestDto);

    EquipementResponseDto toDto(Equipement equipement);

    EquipementResumeDto toResumeDto(Equipement equipement);

    Iterable<EquipementResumeDto> toResumeDtoIterable(Iterable<Equipement> equipements);

    Equipement updateToEntity(EquipementRequestDto equipementRequestDto, @MappingTarget Equipement equipement);
}
