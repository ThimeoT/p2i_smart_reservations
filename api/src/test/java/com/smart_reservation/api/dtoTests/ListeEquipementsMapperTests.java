package com.smart_reservation.api.dtoTests;

import com.smart_reservation.api.dto.mapper.ListeEquipementsMapper;
import com.smart_reservation.api.dto.response.ListeEquipementsResponseDto;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.ListeEquipements;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.StreamSupport;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ListeEquipementsMapperTests {

    @Autowired
    private ListeEquipementsMapper listeEquipementsMapper;

    @Test
    public void testToDtoMapsEquipements() {
        // Arrange
        Equipement equipement1 = new Equipement();
        equipement1.setId(1L);
        equipement1.setNom("Ordinateur");
        equipement1.setDescription("PC portable");

        Equipement equipement2 = new Equipement();
        equipement2.setId(2L);
        equipement2.setNom("Projecteur");
        equipement2.setDescription("Projecteur HD");

        ListeEquipements liste = new ListeEquipements();
        liste.setId(1L);
        liste.setNom("Ma liste");
        liste.setDescription("Description liste");
        liste.setEquipements(List.of(equipement1, equipement2));

        // Act
        ListeEquipementsResponseDto dto = listeEquipementsMapper.toDto(liste);

        // Assert
        assertNotNull(dto);
        assertNotNull(dto.equipements);
        assertEquals(2, dto.equipements.size());
        assertEquals("Ordinateur", dto.equipements.get(0).nom);
        assertEquals("Projecteur", dto.equipements.get(1).nom);
        assertNull(dto.utilisateur); // ignoré dans le mapper
    }

    @Test
    public void testToDtoIterableMapsEquipements() {
        // Arrange
        Equipement equipement = new Equipement();
        equipement.setId(1L);
        equipement.setNom("Ordinateur");

        ListeEquipements liste = new ListeEquipements();
        liste.setId(1L);
        liste.setNom("Ma liste");
        liste.setEquipements(List.of(equipement));

        // Act
        Iterable<ListeEquipementsResponseDto> dtos = listeEquipementsMapper.toDtoIterable(List.of(liste));

        // Assert
        List<ListeEquipementsResponseDto> result = StreamSupport
                .stream(dtos.spliterator(), false)
                .toList();

        assertEquals(1, result.size());
        assertEquals(1, result.getFirst().equipements.size());
        assertEquals("Ordinateur", result.getFirst().equipements.getFirst().nom);
    }
}