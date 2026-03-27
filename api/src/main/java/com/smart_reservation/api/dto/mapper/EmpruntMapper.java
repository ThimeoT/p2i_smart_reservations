package com.smart_reservation.api.dto.mapper;

import com.smart_reservation.api.dto.request.EmpruntRequestDto;
import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.model.Emprunt;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {UtilisateurMapper.class, ExemplaireMapper.class,SessionMapper.class})
public interface EmpruntMapper {

    @Mapping(target = "exemplaire",qualifiedByName = "toDto")
    @Mapping(target = "session", qualifiedByName = "toResumeDto")
    EmpruntResponseDto toDto(Emprunt emprunt);


    @Mapping(target = "id", ignore = true)
    Emprunt toEntity(EmpruntRequestDto empruntDto);

    @Mapping(target = "utilisateur",qualifiedByName = "toResumeDto")
    @Mapping(target = "exemplaire",qualifiedByName = "toDto")
    Iterable<EmpruntResponseDto> toDtoIterable(Iterable<Emprunt> emprunts);

}
