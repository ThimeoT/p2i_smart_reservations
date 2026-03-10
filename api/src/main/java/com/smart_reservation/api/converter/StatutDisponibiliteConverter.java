package com.smart_reservation.api.converter;

import com.smart_reservation.api.model.StatutActionReservation;
import com.smart_reservation.api.model.StatutDisponibilite;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatutDisponibiliteConverter implements AttributeConverter<StatutDisponibilite, String> {

    @Override
    public String convertToDatabaseColumn(StatutDisponibilite statutDisponibilite) {
        if(statutDisponibilite == null){
            return null;
        }
        return statutDisponibilite.getCode();
    }

    @Override
    public StatutDisponibilite convertToEntityAttribute(String code){
        if(code == null){
            return null;
        }
        return Stream.of(StatutDisponibilite.values())
                .filter(s -> s.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
