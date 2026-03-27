package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.HistoriqueReservationRequestDto;
import com.smart_reservation.api.dto.response.HistoriqueReservationResponseDto;
import com.smart_reservation.api.model.HistoriqueReservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {ReservationMapper.class, UtilisateurMapper.class})
public interface HistoriqueReservationMapper {

    HistoriqueReservationResponseDto toDto(HistoriqueReservation historique);

    @Mapping(target = "id", ignore = true)
    HistoriqueReservation toEntity(HistoriqueReservationRequestDto reservation);

    @Mapping(target = "id", ignore = true)
    Iterable<HistoriqueReservationResponseDto> toDtoIterable(Iterable<HistoriqueReservation> reservations);

}
