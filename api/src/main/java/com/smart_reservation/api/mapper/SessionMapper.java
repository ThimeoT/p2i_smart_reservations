package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.EquipementDto;
import com.smart_reservation.api.dto.SessionDto;
import com.smart_reservation.api.dto.SessionDtoReduit;
import com.smart_reservation.api.model.Session;

public interface SessionMapper {

    SessionDto toDto(Session session);

    Session toEntity(SessionDto sessionDto);

    SessionDtoReduit toDtoReduit(Session session);

    Iterable<SessionDto> toDtoIterable(Iterable<Session> sessions);

    Iterable<SessionDtoReduit>  toDtoReduitIterable(Iterable<Session> sessions);
}
