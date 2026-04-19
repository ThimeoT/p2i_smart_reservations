package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.ReservationRequestDto;
import com.smart_reservation.api.dto.response.ReservationResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.dto.resume.ReservationResumeDto;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.Reservation;
import org.mapstruct.*;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(uses = {UtilisateurMapper.class, SessionMapper.class, HistoriqueReservationMapper.class})
public interface ReservationMapper {

    @Named("toResumeDto")
    @Mapping(target = "sessions", qualifiedByName = "toResumeDto")
    @Mapping(target = "equipements", expression = "java(extractEquipements(reservation))")
    ReservationResumeDto toResumeDto(Reservation reservation);

    default List<EquipementResumeDto> extractEquipements(Reservation reservation) {
        Map<Long, Equipement> seen = new LinkedHashMap<>();
        reservation.getSessions().forEach(s ->
            s.getEmprunts().forEach(e -> {
                Equipement eq = e.getExemplaire().getEquipement();
                seen.putIfAbsent(eq.getId(), eq);
            })
        );
        return seen.values().stream()
            .map(eq -> {
                EquipementResumeDto dto = new EquipementResumeDto();
                dto.id = eq.getId();
                dto.nom = eq.getNom();
                dto.urlImage = eq.getUrlImage();
                dto.labels = Collections.emptyList();
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Mapping(target = "sessions", qualifiedByName = "toDto")
    @Mapping(target = "utilisateur", qualifiedByName = "toDto")
    @Mapping(target = "historiques", qualifiedByName = "toDto")
    ReservationResponseDto toDto(Reservation reservation);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "historiques", ignore = true)
    Reservation toEntity(ReservationRequestDto reservationRequestDto);

    @IterableMapping(qualifiedByName = "toResumeDto")
    Iterable<ReservationResumeDto> toResumeDtoIterable(Iterable<Reservation> reservations);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "historiques", ignore = true)
    Reservation updateEntity(ReservationRequestDto reservationDto, @MappingTarget Reservation reservation);
}
