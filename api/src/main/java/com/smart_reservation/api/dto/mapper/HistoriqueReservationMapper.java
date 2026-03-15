package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.response.HistoriqueReservationResponseDto;
import com.smart_reservation.api.model.HistoriqueReservation;
import org.mapstruct.Mapper;

@Mapper
public interface HistoriqueReservationMapper {
    HistoriqueReservationResponseDto toDto(HistoriqueReservation reservation);
    HistoriqueReservation toEntity(HistoriqueReservation reservation);
    Iterable<HistoriqueReservationResponseDto> toDto(Iterable<HistoriqueReservation> reservations);
    Iterable<HistoriqueReservation> toEntity(Iterable<HistoriqueReservation> reservations);
}
