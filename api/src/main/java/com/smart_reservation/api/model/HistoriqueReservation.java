package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "historiques_reservations")
public class HistoriqueReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "historique_reservation_id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column
    private String commentaire;

    @Column(name = "statut_action_reservation", nullable = false)
    private StatutActionReservation statutActionReservation;


}
