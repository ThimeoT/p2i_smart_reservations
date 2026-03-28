package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.EmpruntRequestDto;
import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.model.Emprunt;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(uses = {ExemplaireMapper.class,SessionMapper.class})
public interface EmpruntMapper {

    @Named("toDto")
    @Mapping(target = "exemplaire",qualifiedByName = "toDto")
    @Mapping(target = "session", qualifiedByName = "toResumeDto")
    EmpruntResponseDto toDto(Emprunt emprunt);

    @IterableMapping(qualifiedByName = "toDto")
    Iterable<EmpruntResponseDto> toDtoIterable(Iterable<Emprunt> emprunts);

}
