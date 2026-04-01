package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.UtilisateurRequestDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.dto.resume.UtilisateurResumeDto;
import com.smart_reservation.api.model.Reservation;
import com.smart_reservation.api.model.Utilisateur;
import org.mapstruct.*;

@Mapper(uses={EquipementMapper.class, ListeEquipementsMapper.class})
public interface UtilisateurMapper {

    @Named("toDto")
    UtilisateurResponseDto toDto(Utilisateur utilisateur);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasseHash", ignore = true)
    @Mapping(target = "equipementsFavoris",ignore = true)
    @Mapping(target = "listeEquipements", ignore = true)
    @Mapping(target = "dateExpiration", dateFormat = "yyyy-MM-dd")
    Utilisateur toEntity(UtilisateurRequestDto utilisateurRequestDto);

    @Named("toResumeDto")
    UtilisateurResumeDto toResumeDto(Utilisateur utilisateur);

    @IterableMapping(qualifiedByName = "toResumeDto")
    Iterable<UtilisateurResumeDto> toResumeDtoIterable(Iterable<Utilisateur> utilisateurs);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasseHash", ignore = true)
    @Mapping(target = "equipementsFavoris",ignore = true)
    @Mapping(target = "listeEquipements", ignore = true)
    @Mapping(target = "role", ignore = true)
    Utilisateur updateEntity(UtilisateurRequestDto utilisateurDto, @MappingTarget Utilisateur utilisateur);


}