package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.ReservationDto;
import com.smart_reservation.api.model.Reservation;
import org.mapstruct.Mapper;

@Mapper
public interface ReservationMapper {

    ReservationDto toDto(Reservation reservation);

    Reservation toEntity(ReservationDto reservationDto);

    Iterable<ReservationDto> toDtoIterable(Iterable<Reservation> reservations);
}
