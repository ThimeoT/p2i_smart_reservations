package com.smart_reservation.api.converter;

import com.smart_reservation.api.model.StatutUtilisateur;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatutUtilisateurConverter implements  AttributeConverter<StatutUtilisateur, String>
{
    @Override
    public String convertToDatabaseColumn(StatutUtilisateur statutUtilisateur){
        if(statutUtilisateur == null){
            return null;
        }
        return statutUtilisateur.getCode();
    }

    @Override
    public StatutUtilisateur convertToEntityAttribute(String code){
        if(code == null){
            return null;
        }
        return Stream.of(StatutUtilisateur.values())
                .filter(s->s.getCode().equals(code))
                .findFirst().orElseThrow(IllegalArgumentException::new);
    }
}

