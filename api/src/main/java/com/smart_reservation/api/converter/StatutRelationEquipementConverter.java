package com.smart_reservation.api.converter;

import com.smart_reservation.api.model.StatutDisponibilite;
import com.smart_reservation.api.model.StatutRelationEquipement;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatutRelationEquipementConverter implements AttributeConverter<StatutRelationEquipement, String> {
    @Override
    public String convertToDatabaseColumn(StatutRelationEquipement statutRelationEquipement) {
        if(statutRelationEquipement == null){
            return null;
        }
        return statutRelationEquipement.getCode();
    }

    @Override
    public StatutRelationEquipement convertToEntityAttribute(String code){
        if(code == null){
            return null;
        }
        return Stream.of(StatutRelationEquipement.values())
                .filter(s -> s.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
