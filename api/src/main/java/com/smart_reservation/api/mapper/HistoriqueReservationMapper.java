package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.HistoriqueReservationDto;
import com.smart_reservation.api.model.HistoriqueReservation;
import org.mapstruct.Mapper;

@Mapper
public interface HistoriqueReservationMapper {
    HistoriqueReservationDto toDto(HistoriqueReservation reservation);
    HistoriqueReservation toEntity(HistoriqueReservation reservation);
    Iterable<HistoriqueReservationDto> toDto(Iterable<HistoriqueReservation> reservations);
    Iterable<HistoriqueReservation> toEntity(Iterable<HistoriqueReservation> reservations);
}
