package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.model.Utilisateur;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface UtilisateurMapper {

    UtilisateurResponseDto toDto(Utilisateur utilisateur);

    @Mapping(target = "panier", ignore = true)
    @Mapping(target = "listesEnregistrees", ignore = true)
    @Mapping(target = "reservations", ignore = true)
    @Mapping(target = "emprunts", ignore = true)
    @Mapping(target = "dateExpiration", dateFormat = "yyyy-MM-dd")
    Utilisateur toEntity(UtilisateurResponseDto utilisateurResponseDto);

    Iterable<UtilisateurResponseDto> toDtoIterable(Iterable<Utilisateur> utilisateurs);


}