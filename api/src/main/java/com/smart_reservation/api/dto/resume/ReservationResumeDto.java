package com.smart_reservation.api.dto.resume;

import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.model.StatutReservation;
import java.util.List;

public class ReservationResumeDto {
    public Long id;
    public String titre;
    public StatutReservation statut;
    public UtilisateurResponseDto utilisateur;
    public List<SessionResumeDto> sessions;
    public List<EquipementResumeDto> equipements;
}
