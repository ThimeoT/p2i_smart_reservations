package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.SessionRequestDto;
import com.smart_reservation.api.dto.response.SessionResponseDto;
import com.smart_reservation.api.dto.resume.SessionResumeDto;
import com.smart_reservation.api.model.Session;
import org.mapstruct.MappingTarget;

public interface SessionMapper {

    SessionResponseDto toDto(Session session);

    Session toEntite(SessionRequestDto sessionDto);

    SessionResumeDto toResumeDto(Session session);

    Iterable<SessionResponseDto> toDtoIterable(Iterable<Session> sessions);


    Iterable<SessionResumeDto>  toDtoResumeIterable(Iterable<Session> sessions);

    Session updateEntity(SessionRequestDto sessionDto, @MappingTarget Session session);
}
