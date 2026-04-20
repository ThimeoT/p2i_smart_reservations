package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.SessionRequestDto;
import com.smart_reservation.api.dto.response.SessionResponseDto;
import com.smart_reservation.api.dto.resume.SessionResumeDto;
import com.smart_reservation.api.model.Session;
import org.mapstruct.*;

import java.util.List;

@Mapper
public interface SessionMapper {

    @Named("toDto")
    SessionResponseDto toDto(Session session);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reservation", ignore = true)
    @Mapping(target = "emprunts", ignore = true)
    Session toEntity(SessionRequestDto sessionDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reservation", ignore = true)
    List<Session> toEntityList(List<SessionRequestDto> sessionDtos);

    @Named("toResumeDto")
    @Mapping(target = "reservationId", source = "reservation.id")
    SessionResumeDto toResumeDto(Session session);

    @IterableMapping(qualifiedByName = "toDto")
    Iterable<SessionResponseDto> toDtoIterable(Iterable<Session> sessions);

    @IterableMapping(qualifiedByName = "toResumeDto")
    Iterable<SessionResumeDto>  toDtoResumeIterable(Iterable<Session> sessions);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reservation", ignore = true)
    @Mapping(target = "emprunts", ignore = true)
    Session updateEntity(SessionRequestDto sessionDto, @MappingTarget Session session);


}
