package com.smart_reservation.api.dto;
import com.smart_reservation.api.model.StatutReservation;
import lombok.Data;

import java.util.List;

@Data
public class ReservationDto {
    public Long id;
    public UtilisateurDtoReduit utilisateur;
    public String titre;
    public StatutReservation statutReservation;
    public List<SessionDto> sessions;
    public List<HistoriqueReservationDto> historiqueReservation;
}
