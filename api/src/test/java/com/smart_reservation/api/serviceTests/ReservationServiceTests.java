package com.smart_reservation.api.serviceTests;

import com.smart_reservation.api.dto.mapper.HistoriqueReservationMapper;
import com.smart_reservation.api.dto.mapper.ReservationMapper;
import com.smart_reservation.api.dto.mapper.SessionMapper;
import com.smart_reservation.api.dto.response.ReservationResponseDto;
import com.smart_reservation.api.dto.resume.ReservationResumeDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.*;
import com.smart_reservation.api.repository.HistoriqueReservationRepository;
import com.smart_reservation.api.repository.ReservationRepository;
import com.smart_reservation.api.repository.SessionRepository;
import com.smart_reservation.api.service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTests {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private HistoriqueReservationRepository historiqueReservationRepository;

    @Mock
    private ReservationMapper reservationMapper;

    @Mock
    private SessionMapper sessionMapper;

    @Mock
    private HistoriqueReservationMapper historiqueReservationMapper;

    @Mock
    private EmpruntService empruntService;

    @Mock
    private EquipementService equipementService;

    @Mock
    private UtilisateurService utilisateurService;

    @Mock
    private ExemplaireService exemplaireService;

    @InjectMocks
    private ReservationService reservationService;

    private Reservation reservation1;
    private Reservation reservation2;
    private Utilisateur utilisateur;
    private ReservationResponseDto responseDto;
    private ReservationResumeDto resumeDto;

    @BeforeEach
    void setUp() {
        utilisateur = new Utilisateur();
        utilisateur.setId(1L);
        utilisateur.setNom("Dupont");
        utilisateur.setPrenom("Jean");
        utilisateur.setMail("jean.dupont@gmail.com");

        reservation1 = new Reservation();
        reservation1.setId(1L);
        reservation1.setTitre("Réservation Xsens");
        reservation1.setStatut(StatutReservation.EN_ATTENTE);
        reservation1.setUtilisateur(utilisateur);

        reservation2 = new Reservation();
        reservation2.setId(2L);
        reservation2.setTitre("Réservation Qualysis");
        reservation2.setStatut(StatutReservation.VALIDEE);
        reservation2.setUtilisateur(utilisateur);

        responseDto = new ReservationResponseDto();
        responseDto.id = 1L;
        responseDto.titre = "Réservation Xsens";
        responseDto.statut = StatutReservation.EN_ATTENTE;

        resumeDto = new ReservationResumeDto();
    }

    // -------------------------------------------------------------------------
    // getReservations
    // -------------------------------------------------------------------------

    @Test
    void getReservations_devraitRetournerToutesLesReservations() {
        // GIVEN
        List<Reservation> reservations = List.of(reservation1, reservation2);
        List<ReservationResumeDto> dtos = List.of(resumeDto, new ReservationResumeDto());

        when(reservationRepository.findAll()).thenReturn(reservations);
        when(reservationMapper.toResumeDtoIterable(reservations)).thenReturn(dtos);

        // WHEN
        Iterable<ReservationResumeDto> resultat = reservationService.getReservations();

        // THEN
        assertThat(resultat).asList().hasSize(2);
        verify(reservationRepository).findAll();
    }

    // -------------------------------------------------------------------------
    // getReservationEntity
    // -------------------------------------------------------------------------

    @Test
    void getReservationEntity_devraitRetournerLEntite_siExistante() {
        // GIVEN
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation1));

        // WHEN
        Reservation resultat = reservationService.getReservationEntity(1L);

        // THEN
        assertThat(resultat.getTitre()).isEqualTo("Réservation Xsens");
        verify(reservationRepository).findById(1L);
    }

    @Test
    void getReservationEntity_devraitLeverException_siInexistante() {
        // GIVEN
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> reservationService.getReservationEntity(99L));
    }

    // -------------------------------------------------------------------------
    // getReservation
    // -------------------------------------------------------------------------

    @Test
    void getReservation_devraitRetournerLeDto_siExistante() {
        // GIVEN
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation1));
        when(reservationMapper.toDto(reservation1)).thenReturn(responseDto);

        // WHEN
        ReservationResponseDto resultat = reservationService.getReservation(1L);

        // THEN
        assertThat(resultat.titre).isEqualTo("Réservation Xsens");
        assertThat(resultat.statut).isEqualTo(StatutReservation.EN_ATTENTE);
        verify(reservationMapper).toDto(reservation1);
    }

    @Test
    void getReservation_devraitLeverException_siInexistante() {
        // GIVEN
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> reservationService.getReservation(99L));
        verify(reservationMapper, never()).toDto(any());
    }

    // -------------------------------------------------------------------------
    // getReservationsByUtilisateurId
    // -------------------------------------------------------------------------

    @Test
    void getReservationsByUtilisateurId_devraitFiltrerParUtilisateur() {
        // GIVEN
        List<Reservation> reservations = List.of(reservation1, reservation2);
        List<ReservationResumeDto> dtos = List.of(resumeDto, new ReservationResumeDto());

        when(reservationRepository.findByUtilisateur_Id(1L)).thenReturn(reservations);
        when(reservationMapper.toResumeDtoIterable(reservations)).thenReturn(dtos);

        // WHEN
        Iterable<ReservationResumeDto> resultat =
                reservationService.getReservationsByUtilisateurId(1L);

        // THEN
        assertThat(resultat).asList().hasSize(2);
        verify(reservationRepository).findByUtilisateur_Id(1L);
    }

    // -------------------------------------------------------------------------
    // validerReservation
    // -------------------------------------------------------------------------

    @Test
    void validerReservation_devraitPasserAuStatutValidee() {
        // GIVEN
        ReservationResponseDto valideDto = new ReservationResponseDto();
        valideDto.statut = StatutReservation.VALIDEE;

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation1));
        when(utilisateurService.getUtilisateurEntity(1L)).thenReturn(utilisateur);
        when(reservationRepository.save(reservation1)).thenReturn(reservation1);
        when(reservationMapper.toDto(reservation1)).thenReturn(valideDto);

        // WHEN
        ReservationResponseDto resultat =
                reservationService.validerReservation(1L, 1L, "Validée sans commentaire");

        // THEN
        assertThat(resultat.statut).isEqualTo(StatutReservation.VALIDEE);
        verify(reservationRepository, times(2)).save(reservation1);
    }

    @Test
    void validerReservation_devraitLeverException_siReservationInexistante() {
        // GIVEN
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> reservationService.validerReservation(99L, 1L, ""));
    }

    // -------------------------------------------------------------------------
    // refuserReservation
    // -------------------------------------------------------------------------

    @Test
    void refuserReservation_devraitPasserAuStatutRefusee() {
        // GIVEN
        ReservationResponseDto refuséDto = new ReservationResponseDto();
        refuséDto.statut = StatutReservation.REFUSEE;

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation1));
        when(utilisateurService.getUtilisateurEntity(1L)).thenReturn(utilisateur);
        when(reservationRepository.save(reservation1)).thenReturn(reservation1);
        when(reservationMapper.toDto(reservation1)).thenReturn(refuséDto);

        // WHEN
        ReservationResponseDto resultat =
                reservationService.refuserReservation(1L, 1L, "Créneau non disponible");

        // THEN
        assertThat(resultat.statut).isEqualTo(StatutReservation.REFUSEE);
        verify(reservationRepository, times(2)).save(reservation1);
    }

    // -------------------------------------------------------------------------
    // deleteReservation
    // -------------------------------------------------------------------------

    @Test
    void deleteReservation_devraitSupprimer_siExistante() {
        // GIVEN
        when(reservationRepository.existsById(1L)).thenReturn(true);

        // WHEN
        reservationService.deleteReservation(1L);

        // THEN
        verify(reservationRepository).deleteById(1L);
    }

    @Test
    void deleteReservation_devraitLeverException_siInexistante() {
        // GIVEN
        when(reservationRepository.existsById(99L)).thenReturn(false);

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> reservationService.deleteReservation(99L));
        verify(reservationRepository, never()).deleteById(any());
    }

    // -------------------------------------------------------------------------
    // deleteSession
    // -------------------------------------------------------------------------

    @Test
    void deleteSession_devraitLeverException_siSessionNAppartientPasALaReservation() {
        // GIVEN
        Session sessionEtrangere = new Session();
        sessionEtrangere.setId(99L);

        reservation1.getSessions().clear();

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation1));
        when(sessionRepository.findById(99L)).thenReturn(Optional.of(sessionEtrangere));

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> reservationService.deleteSession(1L, 99L));
        verify(sessionRepository, never()).delete(any());
    }
}
