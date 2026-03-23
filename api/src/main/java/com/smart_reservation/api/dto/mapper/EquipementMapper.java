package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.EquipementRequestDto;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.model.Equipement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface EquipementMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "labels", ignore = true)
    Equipement toEntity(EquipementRequestDto equipementRequestDto);

    EquipementResponseDto toDto(Equipement equipement);

    EquipementResumeDto toResumeDto(Equipement equipement);

    Iterable<EquipementResumeDto> toResumeDtoIterable(Iterable<Equipement> equipements);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "labels", ignore = true)
    @Mapping(target = "exemplaires", ignore = true)
    Equipement updateToEntity(EquipementRequestDto equipementRequestDto, @MappingTarget Equipement equipement);
}
