package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.UtilisateurRequestDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.dto.resume.UtilisateurResumeDto;
import com.smart_reservation.api.model.Reservation;
import com.smart_reservation.api.model.Utilisateur;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface UtilisateurMapper {

    UtilisateurResponseDto toDto(Utilisateur utilisateur);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateExpiration", dateFormat = "yyyy-MM-dd")
    Utilisateur toEntity(UtilisateurRequestDto utilisateurRequestDto);


    Iterable<UtilisateurResumeDto> toResumeDtoIterable(Iterable<Utilisateur> utilisateurs);

    @Mapping(target = "id", ignore = true)
    Utilisateur updateEntity(UtilisateurRequestDto utilisateurDto, @MappingTarget Utilisateur utilisateur);


}