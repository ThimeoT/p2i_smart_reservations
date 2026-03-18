package com.smart_reservation.api.converter;

import com.smart_reservation.api.model.StatutEmprunt;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatutEmpruntConverter implements AttributeConverter<StatutEmprunt, String> {
    @Override
    public String convertToDatabaseColumn(StatutEmprunt statutEmprunt) {
        if (statutEmprunt == null) {
            return null;
        }
        return statutEmprunt.getCode();
    }
    @Override
    public StatutEmprunt convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }
        return Stream.of(StatutEmprunt.values())
                .filter(s -> s.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
