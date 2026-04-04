package com.smart_reservation.api.dto.response;
import com.smart_reservation.api.model.StatutReservation;
import lombok.Data;

import java.util.List;

@Data
public class ReservationResponseDto {

    public Long id;

    public UtilisateurResponseDto utilisateur;

    public String titre;

    public StatutReservation statut;

    public List<SessionResponseDto> sessions;

    public List<HistoriqueReservationResponseDto> historiques;
}
