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
    @Column(name = "historique_reservation_id")
    private long id;

    @ManyToOne(
            cascade = {CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinColumn(name="reservation_id")
    private Reservation reservation;

    @ManyToOne(
            cascade = {CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinColumn(name="utilisateur_id")
    private Utilisateur utilisateur;

    @Column
    private LocalDateTime date;

    @Column
    private String commentaire;

    @Column(name="statut_action_reservation")
    private StatutActionReservation statutActionReservation;


}
