package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.ReservationResponseDto;
import com.smart_reservation.api.model.Reservation;
import org.mapstruct.Mapper;

@Mapper
public interface ReservationMapper {

    ReservationResponseDto toDto(Reservation reservation);

    Reservation toEntity(ReservationResponseDto reservationResponseDto);

    Iterable<ReservationResponseDto> toDtoIterable(Iterable<Reservation> reservations);
}
