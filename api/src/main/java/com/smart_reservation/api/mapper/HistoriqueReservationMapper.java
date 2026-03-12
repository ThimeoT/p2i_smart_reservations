package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.HistoriqueReservationDto;
import com.smart_reservation.api.model.HistoriqueReservation;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HistoriqueReservationMapper {
    HistoriqueReservationDto toDto(HistoriqueReservation reservation);
    HistoriqueReservation toEntity(HistoriqueReservation reservation);
    Iterable<HistoriqueReservationDto> toDto(Iterable<HistoriqueReservation> reservations);
    Iterable<HistoriqueReservation> toEntity(Iterable<HistoriqueReservation> reservations);
}
