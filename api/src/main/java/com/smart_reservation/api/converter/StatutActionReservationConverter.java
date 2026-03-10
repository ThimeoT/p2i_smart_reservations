package com.smart_reservation.api.converter;

import com.smart_reservation.api.model.StatutActionReservation;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatutActionReservationConverter implements AttributeConverter<StatutActionReservation, String> {
    @Override
    public String convertToDatabaseColumn(StatutActionReservation statutActionReservation) {
        if (statutActionReservation == null) {
            return null;
        }
        return statutActionReservation.getCode();
    }

    @Override
    public StatutActionReservation convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(StatutActionReservation.values())
                .filter(s -> s.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
