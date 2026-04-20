package com.smart_reservation.api.serviceTests;

import com.smart_reservation.api.dto.mapper.ExemplaireMapper;
import com.smart_reservation.api.dto.request.ExemplaireRequestDto;
import com.smart_reservation.api.dto.response.ExemplaireResponseDto;
import com.smart_reservation.api.exception.QuantiteExemplaireIndisponibleException;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.Exemplaire;
import com.smart_reservation.api.model.StatutDisponibilite;
import com.smart_reservation.api.repository.ExemplaireRepository;
import com.smart_reservation.api.service.EquipementService;
import com.smart_reservation.api.service.ExemplaireService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExemplaireServiceTests {

    @Mock
    private EquipementService equipementService;

    @Mock
    private ExemplaireRepository exemplaireRepository;

    @Mock
    private ExemplaireMapper exemplaireMapper;

    @InjectMocks
    private ExemplaireService exemplaireService;

    private Exemplaire exemplaire1;
    private Exemplaire exemplaire2;
    private ExemplaireResponseDto responseDto;
    private ExemplaireRequestDto requestDto;
    private Equipement equipement;

    @BeforeEach
    void setUp() {
        equipement = new Equipement();
        equipement.setId(1L);
        equipement.setNom("Xsens");

        exemplaire1 = new Exemplaire();
        exemplaire1.setId(1L);
        exemplaire1.setNomSerie("XS-001");
        exemplaire1.setEquipement(equipement);
        exemplaire1.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);

        exemplaire2 = new Exemplaire();
        exemplaire2.setId(2L);
        exemplaire2.setNomSerie("XS-002");
        exemplaire2.setEquipement(equipement);
        exemplaire2.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);

        responseDto = new ExemplaireResponseDto();
        responseDto.id = 1L;
        responseDto.nomSerie = "XS-001";

        requestDto = new ExemplaireRequestDto();
        requestDto.equipementId = 1L;
        requestDto.nomSerie = "XS-001";
        requestDto.statutDisponibilite = StatutDisponibilite.DISPONIBLE;
    }

    // -------------------------------------------------------------------------
    // getExemplaireEntity
    // -------------------------------------------------------------------------

    @Test
    void getExemplaireEntity_devraitRetournerLEntite_siExistant() {
        // GIVEN
        when(exemplaireRepository.findById(1L)).thenReturn(Optional.of(exemplaire1));

        // WHEN
        Exemplaire resultat = exemplaireService.getExemplaireEntity(1L);

        // THEN
        assertThat(resultat.getNomSerie()).isEqualTo("XS-001");
        verify(exemplaireRepository).findById(1L);
    }

    @Test
    void getExemplaireEntity_devraitLeverException_siInexistant() {
        // GIVEN
        when(exemplaireRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> exemplaireService.getExemplaireEntity(99L));
    }

    // -------------------------------------------------------------------------
    // getExemplaire
    // -------------------------------------------------------------------------

    @Test
    void getExemplaire_devraitRetournerLeDto_siExistant() {
        // GIVEN
        when(exemplaireRepository.findById(1L)).thenReturn(Optional.of(exemplaire1));
        when(exemplaireMapper.toDto(exemplaire1)).thenReturn(responseDto);

        // WHEN
        ExemplaireResponseDto resultat = exemplaireService.getExemplaire(1L);

        // THEN
        assertThat(resultat.nomSerie).isEqualTo("XS-001");
        verify(exemplaireMapper).toDto(exemplaire1);
    }

    @Test
    void getExemplaire_devraitLeverException_siInexistant() {
        // GIVEN
        when(exemplaireRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> exemplaireService.getExemplaire(99L));
        verify(exemplaireMapper, never()).toDto(any());
    }

    // -------------------------------------------------------------------------
    // createExemplaire
    // -------------------------------------------------------------------------

    @Test
    void createExemplaire_devraitSauvegarderEtRetourner() {
        // GIVEN
        when(exemplaireMapper.toEntity(requestDto)).thenReturn(exemplaire1);
        when(equipementService.getEquipementEntity(1L)).thenReturn(equipement);
        when(exemplaireRepository.save(exemplaire1)).thenReturn(exemplaire1);
        when(exemplaireMapper.toDto(exemplaire1)).thenReturn(responseDto);

        // WHEN
        ExemplaireResponseDto resultat = exemplaireService.createExemplaire(requestDto);

        // THEN
        assertThat(resultat.nomSerie).isEqualTo("XS-001");
        verify(exemplaireRepository).save(exemplaire1);
    }

    @Test
    void createExemplaire_devraitLeverException_siEquipementInexistant() {
        // GIVEN
        when(exemplaireMapper.toEntity(requestDto)).thenReturn(exemplaire1);
        when(equipementService.getEquipementEntity(1L))
                .thenThrow(new RessourceIntrouvableException("Equipement", 1L));

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> exemplaireService.createExemplaire(requestDto));
        verify(exemplaireRepository, never()).save(any());
    }

    // -------------------------------------------------------------------------
    // updateExemplaire
    // -------------------------------------------------------------------------

    @Test
    void updateExemplaire_devraitMettreAJour_siExistant() {
        // GIVEN
        when(exemplaireRepository.findById(1L)).thenReturn(Optional.of(exemplaire1));
        when(exemplaireRepository.save(exemplaire1)).thenReturn(exemplaire1);
        when(exemplaireMapper.toDto(exemplaire1)).thenReturn(responseDto);

        // WHEN
        ExemplaireResponseDto resultat = exemplaireService.updateExemplaire(1L, requestDto);

        // THEN
        assertThat(resultat).isEqualTo(responseDto);
        verify(exemplaireMapper).updateToEntity(requestDto, exemplaire1);
        verify(exemplaireRepository).save(exemplaire1);
    }

    @Test
    void updateExemplaire_devraitLeverException_siInexistant() {
        // GIVEN
        when(exemplaireRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> exemplaireService.updateExemplaire(99L, requestDto));
        verify(exemplaireRepository, never()).save(any());
    }

    // -------------------------------------------------------------------------
    // deleteExemplaire
    // -------------------------------------------------------------------------

    @Test
    void deleteExemplaire_devraitSupprimer_siExistant() {
        // GIVEN
        when(exemplaireRepository.existsById(1L)).thenReturn(true);

        // WHEN
        exemplaireService.deleteExemplaire(1L);

        // THEN
        verify(exemplaireRepository).deleteById(1L);
    }

    @Test
    void deleteExemplaire_devraitLeverException_siInexistant() {
        // GIVEN
        when(exemplaireRepository.existsById(99L)).thenReturn(false);

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> exemplaireService.deleteExemplaire(99L));
        verify(exemplaireRepository, never()).deleteById(any());
    }

    // -------------------------------------------------------------------------
    // getExemplairesDisponibles (avec quantité)
    // -------------------------------------------------------------------------

    @Test
    void getExemplairesDisponibles_devraitRetourner_siQuantiteSuffisante() {
        // GIVEN
        LocalDateTime debut = LocalDateTime.now();
        LocalDateTime fin = debut.plusHours(2);
        when(exemplaireRepository.findExemplairesDisponibles(1L, debut, fin))
                .thenReturn(List.of(exemplaire1, exemplaire2));

        // WHEN
        List<Exemplaire> resultat = exemplaireService.getExemplairesDisponibles(1L, debut, fin, 2);

        // THEN
        assertThat(resultat).hasSize(2);
    }

    @Test
    void getExemplairesDisponibles_devraitLeverException_siQuantiteInsuffisante() {
        // GIVEN
        LocalDateTime debut = LocalDateTime.now();
        LocalDateTime fin = debut.plusHours(2);
        when(exemplaireRepository.findExemplairesDisponibles(1L, debut, fin))
                .thenReturn(List.of(exemplaire1));
        when(equipementService.getEquipement(1L)).thenReturn(new com.smart_reservation.api.dto.response.EquipementResponseDto());

        // WHEN / THEN
        assertThrows(QuantiteExemplaireIndisponibleException.class,
                () -> exemplaireService.getExemplairesDisponibles(1L, debut, fin, 3));
    }
}
