package com.smart_reservation.api.serviceTests;

import com.smart_reservation.api.dto.mapper.EmpruntMapper;
import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.exception.EmpruntTermineAvantDebutSessionException;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.*;
import com.smart_reservation.api.repository.EmpruntRepository;
import com.smart_reservation.api.service.EmpruntService;
import com.smart_reservation.api.service.EquipementService;
import com.smart_reservation.api.service.ExemplaireService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmpruntServiceTests {

    @Mock
    private EmpruntRepository empruntRepository;

    @Mock
    private EmpruntMapper empruntMapper;

    @Mock
    private ExemplaireService exemplaireService;

    @Mock
    private EquipementService equipementService;

    @InjectMocks
    private EmpruntService empruntService;

    private Emprunt emprunt;
    private Session session;
    private Exemplaire exemplaire;
    private EmpruntResponseDto responseDto;

    @BeforeEach
    void setUp() {
        session = new Session();
        session.setId(1L);
        session.setDebut(LocalDateTime.now().plusDays(1));
        session.setFin(LocalDateTime.now().plusDays(1).plusHours(2));

        Equipement equipement = new Equipement();
        equipement.setId(1L);
        equipement.setNom("Xsens");

        exemplaire = new Exemplaire();
        exemplaire.setId(1L);
        exemplaire.setNomSerie("XS-001");
        exemplaire.setEquipement(equipement);

        emprunt = new Emprunt();
        emprunt.setId(1L);
        emprunt.setExemplaire(exemplaire);
        emprunt.setSession(session);
        emprunt.setStatut(StatutEmprunt.PLANIFIE);
        emprunt.setDateRetourPrevue(session.getFin());

        responseDto = new EmpruntResponseDto();
        responseDto.id = 1L;
        responseDto.statut = StatutEmprunt.PLANIFIE;
    }

    // -------------------------------------------------------------------------
    // existsById
    // -------------------------------------------------------------------------

    @Test
    void existsById_devraitRetournerTrue_siExistant() {
        // GIVEN
        when(empruntRepository.existsById(1L)).thenReturn(true);

        // WHEN
        Boolean resultat = empruntService.existsById(1L);

        // THEN
        assertThat(resultat).isTrue();
    }

    @Test
    void existsById_devraitLeverException_siInexistant() {
        // GIVEN
        when(empruntRepository.existsById(99L)).thenReturn(false);

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> empruntService.existsById(99L));
    }

    // -------------------------------------------------------------------------
    // getEmpruntEntity
    // -------------------------------------------------------------------------

    @Test
    void getEmpruntEntity_devraitRetournerLEntite_siExistant() {
        // GIVEN
        when(empruntRepository.findById(1L)).thenReturn(Optional.of(emprunt));

        // WHEN
        Emprunt resultat = empruntService.getEmpruntEntity(1L);

        // THEN
        assertThat(resultat.getStatut()).isEqualTo(StatutEmprunt.PLANIFIE);
        verify(empruntRepository).findById(1L);
    }

    @Test
    void getEmpruntEntity_devraitLeverException_siInexistant() {
        // GIVEN
        when(empruntRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> empruntService.getEmpruntEntity(99L));
    }

    // -------------------------------------------------------------------------
    // createEmprunt
    // -------------------------------------------------------------------------

    @Test
    void createEmprunt_devraitCreerAvecStatutPlanifie() {
        // WHEN
        Emprunt resultat = empruntService.createEmprunt(exemplaire, session);

        // THEN
        assertThat(resultat.getStatut()).isEqualTo(StatutEmprunt.PLANIFIE);
        assertThat(resultat.getExemplaire()).isEqualTo(exemplaire);
        assertThat(resultat.getSession()).isEqualTo(session);
        assertThat(resultat.getDateRetourPrevue()).isEqualTo(session.getFin());
        verify(empruntRepository, never()).save(any());
    }

    // -------------------------------------------------------------------------
    // terminer
    // -------------------------------------------------------------------------

    @Test
    void terminer_devraitPasserAuStatutTermine_siSessionDansLePasse() {
        // GIVEN — session dans le passé pour que le retour soit valide
        session.setDebut(LocalDateTime.now().minusDays(2));
        session.setFin(LocalDateTime.now().minusDays(1));
        emprunt.setSession(session);

        EmpruntResponseDto terminéDto = new EmpruntResponseDto();
        terminéDto.statut = StatutEmprunt.TERMINE;

        when(empruntRepository.findById(1L)).thenReturn(Optional.of(emprunt));
        when(empruntMapper.toDto(emprunt)).thenReturn(terminéDto);

        // WHEN
        EmpruntResponseDto resultat = empruntService.terminer(1L);

        // THEN
        assertThat(resultat.statut).isEqualTo(StatutEmprunt.TERMINE);
        verify(empruntRepository).save(emprunt);
    }

    @Test
    void terminer_devraitLeverException_siRetourAvantDebutSession() {
        // GIVEN — session dans le futur : retour maintenant est avant le début
        session.setDebut(LocalDateTime.now().plusDays(2));
        session.setFin(LocalDateTime.now().plusDays(3));
        emprunt.setSession(session);

        when(empruntRepository.findById(1L)).thenReturn(Optional.of(emprunt));

        // WHEN / THEN
        assertThrows(EmpruntTermineAvantDebutSessionException.class,
                () -> empruntService.terminer(1L));
        verify(empruntRepository, never()).save(any());
    }

    // -------------------------------------------------------------------------
    // annuler
    // -------------------------------------------------------------------------

    @Test
    void annuler_devraitPasserAuStatutAnnule() {
        // GIVEN
        EmpruntResponseDto annuléDto = new EmpruntResponseDto();
        annuléDto.statut = StatutEmprunt.ANNULE;

        when(empruntRepository.findById(1L)).thenReturn(Optional.of(emprunt));
        when(empruntMapper.toDto(emprunt)).thenReturn(annuléDto);

        // WHEN
        EmpruntResponseDto resultat = empruntService.annuler(1L);

        // THEN
        assertThat(resultat.statut).isEqualTo(StatutEmprunt.ANNULE);
        verify(empruntRepository).save(emprunt);
    }

    // -------------------------------------------------------------------------
    // deleteEmprunt
    // -------------------------------------------------------------------------

    @Test
    void deleteEmprunt_devraitSupprimer_siExistant() {
        // GIVEN
        when(empruntRepository.existsById(1L)).thenReturn(true);

        // WHEN
        empruntService.deleteEmprunt(1L);

        // THEN
        verify(empruntRepository).deleteById(1L);
    }

    @Test
    void deleteEmprunt_devraitLeverException_siInexistant() {
        // GIVEN
        when(empruntRepository.existsById(99L)).thenReturn(false);

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> empruntService.deleteEmprunt(99L));
        verify(empruntRepository, never()).deleteById(any());
    }
}
