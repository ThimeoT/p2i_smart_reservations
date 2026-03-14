package com.smart_reservation.api.mapper;

import com.smart_reservation.api.dto.response.SessionResponseDto;
import com.smart_reservation.api.dto.resume.SessionResumeDto;
import com.smart_reservation.api.model.Session;
import org.mapstruct.MappingTarget;

public interface SessionMapper {

    SessionResponseDto toDto(Session session);

    Session toEntite(SessionResponseDto sessionDto);

    SessionResumeDto toDtoReduit(Session session);

    Iterable<SessionResponseDto> toDtoIterable(Iterable<Session> sessions);


    Iterable<SessionResumeDto>  toDtoReduitIterable(Iterable<Session> sessions);

    Session actualiserEntity(SessionResponseDto sessionDto, @MappingTarget Session session);
}
