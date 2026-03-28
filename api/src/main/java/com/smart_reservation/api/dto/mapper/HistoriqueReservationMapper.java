package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.HistoriqueReservationRequestDto;
import com.smart_reservation.api.dto.response.HistoriqueReservationResponseDto;
import com.smart_reservation.api.model.HistoriqueReservation;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(uses = {ReservationMapper.class, UtilisateurMapper.class})
public interface HistoriqueReservationMapper {

    @Named("toDto")
    HistoriqueReservationResponseDto toDto(HistoriqueReservation historique);

    @IterableMapping(qualifiedByName = "toDto")
    Iterable<HistoriqueReservationResponseDto> toDtoIterable(Iterable<HistoriqueReservation> reservations);

}
