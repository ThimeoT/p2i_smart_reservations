package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.ReservationRequestDto;
import com.smart_reservation.api.dto.response.ReservationResponseDto;
import com.smart_reservation.api.dto.resume.ReservationResumeDto;
import com.smart_reservation.api.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface ReservationMapper {

    @Mapping(target = "nombreSessions", expression = "java(reservation.getSessions().size())")
    @Mapping(target = "nombreEquipements", expression = "java(reservation.getSessions().stream().mapToInt(s -> s.getEmprunts().size()).sum())")
    ReservationResumeDto toResumeDto(Reservation reservation);

    ReservationResponseDto toDto(Reservation reservation);

    @Mapping(target = "id", ignore = true)
    Reservation toEntity(ReservationRequestDto reservationRequestDto);

    Iterable<ReservationResponseDto> toDtoIterable(Iterable<Reservation> reservations);

    @Mapping(target = "id", ignore = true)
    Reservation updateEntity(ReservationRequestDto reservationDto, @MappingTarget Reservation reservation);
}
