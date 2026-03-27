package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.ReservationRequestDto;
import com.smart_reservation.api.dto.response.ReservationResponseDto;
import com.smart_reservation.api.dto.resume.ReservationResumeDto;
import com.smart_reservation.api.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(uses = {UtilisateurMapper.class, SessionMapper.class, HistoriqueReservationMapper.class})
public interface ReservationMapper {

    @Named("toResumeDto")
    @Mapping(target = "nombreSessions", expression = "java(reservation.getSessions().size())")
    @Mapping(target = "nombreEquipements", expression = "java(reservation.getSessions().stream().mapToInt(s -> s.getEmprunts().size()).sum())")
    ReservationResumeDto toResumeDto(Reservation reservation);

    @Mapping(target="sessions", qualifiedByName="toDto")
    @Mapping(target = "utilisateur", qualifiedByName = "toResumeDto")
    ReservationResponseDto toDto(Reservation reservation);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "historiques", ignore = true)
    Reservation toEntity(ReservationRequestDto reservationRequestDto);

    @Mapping(target="sessions", qualifiedByName="toDto")
    @Mapping(target = "utilisateur", qualifiedByName = "toResumeDto")
    Iterable<ReservationResumeDto> toDtoIterable(Iterable<Reservation> reservations);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "utilisateur", ignore = true)
    @Mapping(target = "historiques", ignore = true)
    Reservation updateEntity(ReservationRequestDto reservationDto, @MappingTarget Reservation reservation);
}
