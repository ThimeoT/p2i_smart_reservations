package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.UtilisateurRequestDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.model.Utilisateur;
import org.mapstruct.*;

@Mapper(uses={EquipementMapper.class, ListeEquipementsMapper.class})
public interface UtilisateurMapper {

    @Named("toDto")
    UtilisateurResponseDto toDto(Utilisateur utilisateur);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasseHash", ignore = true)
    @Mapping(target = "equipementsFavoris", ignore = true)
    @Mapping(target = "listeEquipements", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "statutUtilisateur", ignore = true)
    Utilisateur toEntity(UtilisateurRequestDto utilisateurRequestDto);



    @IterableMapping(qualifiedByName = "toDto")
    Iterable<UtilisateurResponseDto> toDtoIterable(Iterable<Utilisateur> utilisateurs);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasseHash", ignore = true)
    @Mapping(target = "equipementsFavoris", ignore = true)
    @Mapping(target = "listeEquipements", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "dateExpiration", ignore = true)
    @Mapping(target = "statutUtilisateur", ignore = true)
    Utilisateur updateEntity(UtilisateurRequestDto utilisateurDto, @MappingTarget Utilisateur utilisateur);


}