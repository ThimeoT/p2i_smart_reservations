package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.EquipementQuantiteDto;
import com.smart_reservation.api.dto.mapper.HistoriqueReservationMapper;
import com.smart_reservation.api.dto.mapper.ReservationMapper;
import com.smart_reservation.api.dto.mapper.SessionMapper;
import com.smart_reservation.api.dto.request.ReservationRequestDto;
import com.smart_reservation.api.dto.request.SessionRequestDto;
import com.smart_reservation.api.dto.response.HistoriqueReservationResponseDto;
import com.smart_reservation.api.dto.response.ReservationResponseDto;
import com.smart_reservation.api.dto.response.SessionResponseDto;
import com.smart_reservation.api.dto.resume.ReservationResumeDto;
import com.smart_reservation.api.dto.resume.SessionResumeDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.*;
import com.smart_reservation.api.repository.HistoriqueReservationRepository;
import com.smart_reservation.api.repository.ReservationRepository;
import com.smart_reservation.api.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final SessionRepository sessionRepository;
    private final HistoriqueReservationRepository historiqueReservationRepository;

    private final ReservationMapper reservationMapper;
    private final SessionMapper sessionMapper;
    private final HistoriqueReservationMapper historiqueReservationMapper;

    private final EmpruntService empruntService;
    private final EquipementService equipementService;
    private final UtilisateurService utilisateurService;
    private final ExemplaireService exemplaireService;

    // TODO : Récupérer toutes les réservations
    @Transactional
    public Iterable<ReservationResumeDto> getReservations() {
        return reservationMapper.toResumeDtoIterable(reservationRepository.findAll());
    }

    @Transactional
    public Iterable<ReservationResumeDto> getReservations(List<Long> ids) {
        return reservationMapper.toResumeDtoIterable(reservationRepository.findAllById(ids));
    }

    // TODO : Récupérer une réservation selon son id

    @Transactional
    public Reservation getReservationEntity(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RessourceIntrouvableException("Réservation", id));
    }


    @Transactional
    public ReservationResponseDto getReservation(Long id) {
        return reservationMapper.toDto(getReservationEntity(id));
    }
    // TODO : Récupérer les réservations d'un utilisateur

    public Iterable<ReservationResumeDto> getReservationsByUtilisateurId(Long id) {
        return reservationMapper.toResumeDtoIterable(reservationRepository.findByUtilisateur_Id(id));
    }

    // TODO : Ajouter une réservation
    @Transactional
    public ReservationResponseDto createReservation(ReservationRequestDto dto) {

        Utilisateur utilisateur = utilisateurService.getUtilisateurEntity(dto.utilisateurId);
        Reservation reservation = reservationMapper.toEntity(dto);

        reservation.setUtilisateur(utilisateur);
        reservation.setStatut(StatutReservation.EN_ATTENTE);

        verifierAbsenceSuperposition(dto.sessions);
        List<Session> sessions = dto.sessions.stream()
                .sorted(Comparator.comparing(s -> s.debut))
                .map(this::ajouterSession)
                .toList();
        sessions.forEach(reservation::addSession);
        return reservationMapper.toDto(reservationRepository.save(reservation));
    }

    private void planifierEmprunts(Session session, List<EquipementQuantiteDto> eqDtos)
    {
        for(EquipementQuantiteDto eqDto : eqDtos)
        {
            List<Exemplaire> exemplairesDisponibles = exemplaireService.getExemplairesDisponibles(
                    eqDto.equipementId,
                    session.getDebut(),
                    session.getFin(),
                    eqDto.getQuantite()
            );
            exemplairesDisponibles.stream().limit(eqDto.quantite).forEach(exemplaire -> {
                Emprunt emprunt = empruntService.createEmprunt(exemplaire,session);
                session.addEmprunt(emprunt);
            });
        }
    }


    // TODO : Modifier une réservation
    @Transactional
    public ReservationResponseDto updateReservation(Long reservationId, ReservationRequestDto dto)
    {
        Reservation reservation = getReservationEntity(reservationId);
        reservationMapper.updateEntity(dto, reservation);
        verifierAbsenceSuperposition(dto.sessions);
        reservation.getSessions().removeIf(session ->
                dto.sessions.stream().noneMatch(s -> s.id != null && s.id.equals(session.getId()))
        );
        for(SessionRequestDto sessionDto : dto.sessions) {
            if(sessionDto.id != null) {
                updateSession(sessionDto,reservationId);
            } else {
                ajouterSession(sessionDto,reservation);
            }
        }
        reservation.setStatut(StatutReservation.EN_ATTENTE);
        return reservationMapper.toDto(reservationRepository.save(reservation));
    }
    // TODO : Valider une réservation
    @Transactional
    public ReservationResponseDto validerReservation(Long reservationId,Long utilisateurId, String message) {
        Reservation reservation = getReservationEntity(reservationId);
        Utilisateur utilisateur = utilisateurService.getUtilisateurEntity(utilisateurId);
        reservation.setStatut(StatutReservation.VALIDEE);
        reservationRepository.save(reservation);
        ajouterHistoriqueReservation(
                reservation, utilisateur, StatutActionReservation.VALIDATION, message);
        return reservationMapper.toDto(reservation);
    }

    // TODO : Refuser une réservation
    @Transactional
    public ReservationResponseDto refuserReservation(Long reservationId,Long utilisateurId, String message) {
        Reservation reservation = getReservationEntity(reservationId);
        Utilisateur utilisateur = utilisateurService.getUtilisateurEntity(utilisateurId);
        reservation.setStatut(StatutReservation.REFUSEE);
        reservationRepository.save(reservation);
        ajouterHistoriqueReservation(
                reservation, utilisateur, StatutActionReservation.REFUS, message);
        return reservationMapper.toDto(reservation);
    }

    @Transactional
    public void deleteReservation(Long reservationId)
    {
        if(!reservationRepository.existsById(reservationId))
        {
            throw new RessourceIntrouvableException("Réservation", reservationId);
        }
        reservationRepository.deleteById(reservationId);
    }


    // TODO : Ajouter une note personnelle à une réservation

    // SESSION
    @Transactional
    public Iterable<SessionResponseDto> getSessions() {
        return sessionMapper.toDtoIterable(sessionRepository.findAll());
    }

    @Transactional
    public Session getSessionEntity(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new RessourceIntrouvableException("Session", id));
    }

    @Transactional
    public SessionResponseDto getSession(Long id) {
        return sessionMapper.toDto(getSessionEntity(id));
    }

    @Transactional
    public Iterable<SessionResumeDto> getSessionsFromReservation(Long reservationId) {
        Reservation reservation = getReservationEntity(reservationId);
        return sessionMapper.toDtoResumeIterable(reservation.getSessions());
    }


    private Session ajouterSession(SessionRequestDto sessionDto) {
        Session session = sessionMapper.toEntity(sessionDto);
        List<Equipement> equipements = sessionDto.equipementQuantiteDtos.stream()
                .map(eq -> equipementService.getEquipementEntity(eq.equipementId))
                .toList();
        equipementService.verifierRelationsEquipement(equipements);
        planifierEmprunts(session, sessionDto.equipementQuantiteDtos);
        return session;
    }

    private Session ajouterSession(SessionRequestDto sessionDto, Reservation reservation) {
        Session session = ajouterSession(sessionDto);
        reservation.addSession(session);
        reservationRepository.save(reservation);
        return session;
    }

    @Transactional
    public SessionResponseDto createSession(SessionRequestDto sessionDto, Long reservationId) {
        Reservation reservation = getReservationEntity(reservationId);
        Session session = ajouterSession(sessionDto,reservation); // appelle la version privée
        return sessionMapper.toDto(session);
    }


    @Transactional
    public SessionResponseDto updateSession(SessionRequestDto sessionDto, Long reservationId ) {
        Reservation reservation = getReservationEntity(reservationId);
        Session session = getSessionEntity(sessionDto.id);
        if(!reservation.getSessions().contains(session)) {
            throw new RessourceIntrouvableException("Session", sessionDto.id);
        }
        reservation.removeSession(session);
        Session nouvelleSession = ajouterSession(sessionDto, reservation);
        return sessionMapper.toDto(nouvelleSession);
    }

    @Transactional
    public void deleteSession(Long reservationId, Long sessionId) {
        Reservation reservation = getReservationEntity(reservationId);
        Session session = getSessionEntity(sessionId);
        if(!reservation.getSessions().contains(session)) {
            throw new RessourceIntrouvableException("Session", sessionId);
        }
        sessionRepository.delete(session);
    }

    @Transactional
    private void verifierAbsenceSuperposition(List<SessionRequestDto> sessionRequestDtos) {
        for(int i = 0; i < sessionRequestDtos.size(); i++) {
            for(int j = i + 1; j < sessionRequestDtos.size(); j++) {
                SessionRequestDto a = sessionRequestDtos.get(i);
                SessionRequestDto b = sessionRequestDtos.get(j);
                if(a.debut.isBefore(b.fin) && a.fin.isAfter(b.debut)) {
                    throw new IllegalArgumentException("Deux sessions se superposent");
                }
            }
        }
    }

    // HISTORIQUE DE RESERVATION

    public List<HistoriqueReservationResponseDto> getHistoriqueFromReservation(Long reservationId) {
        return getReservation(reservationId).historiques;
    }

    @Transactional
    private HistoriqueReservationResponseDto ajouterHistoriqueReservation(Reservation reservation, Utilisateur utilisateur, StatutActionReservation statut, String commentaire) {
        HistoriqueReservation historique = new HistoriqueReservation();
        historique.setUtilisateur(utilisateur);
        historique.setReservation(reservation);
        historique.setAction(statut);
        historique.setCommentaire(commentaire);
        historique.setDate(LocalDateTime.now());
        reservation.addHistorique(historique);
        reservationRepository.save(reservation);
        return historiqueReservationMapper.toDto(historique);
    }


}
