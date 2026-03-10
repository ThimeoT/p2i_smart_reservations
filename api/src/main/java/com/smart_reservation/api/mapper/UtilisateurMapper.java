package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.UtilisateurDto;
import com.smart_reservation.api.model.Utilisateur;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface UtilisateurMapper {

    UtilisateurDto toDto(Utilisateur utilisateur);

    @Mapping(target = "panier", ignore = true)
    @Mapping(target = "listesEnregistrees", ignore = true)
    @Mapping(target = "reservations", ignore = true)
    @Mapping(target = "emprunts", ignore = true)
    @Mapping(target = "dateExpiration", dateFormat = "yyyy-MM-dd")
    Utilisateur toEntity(UtilisateurDto utilisateurDto);

    Iterable<UtilisateurDto> toDtoIterable(Iterable<Utilisateur> utilisateurs);


}