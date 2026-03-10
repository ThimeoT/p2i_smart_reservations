package com.smart_reservation.api.converter;

import com.smart_reservation.api.model.StatutRelationEquipement;
import com.smart_reservation.api.model.StatutReservation;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatutReservationConverter implements AttributeConverter<StatutReservation, String> {
    @Override
    public String convertToDatabaseColumn(StatutReservation statutReservation) {
        if (statutReservation == null) {
            return null;
        }
        return statutReservation.getCode();
    }
    @Override
    public StatutReservation convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }
        return Stream.of(StatutReservation.values())
                .filter(s -> s.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
