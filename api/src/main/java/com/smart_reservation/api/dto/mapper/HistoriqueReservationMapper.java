package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.response.HistoriqueReservationResponseDto;
import com.smart_reservation.api.model.HistoriqueReservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface HistoriqueReservationMapper {
    HistoriqueReservationResponseDto toDto(HistoriqueReservation reservation);
    @Mapping(target = "id", ignore = true)
    HistoriqueReservation toEntity(HistoriqueReservation reservation);
    Iterable<HistoriqueReservationResponseDto> toDto(Iterable<HistoriqueReservation> reservations);
    @Mapping(target = "id", ignore = true)
    Iterable<HistoriqueReservation> toEntity(Iterable<HistoriqueReservation> reservations);
}
