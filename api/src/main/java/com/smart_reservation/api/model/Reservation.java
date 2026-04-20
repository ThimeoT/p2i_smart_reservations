package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="utilisateur_id")
    private Utilisateur utilisateur;

    @Column
    private String titre;

    @Column
    private String description;

    @Column(name = "statut", columnDefinition = "VARCHAR(50)")
    private StatutReservation statut;

    @OneToMany(mappedBy = "reservation",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Session> sessions = new ArrayList<>();

    @OneToMany(
            mappedBy = "reservation",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<HistoriqueReservation> historiques = new ArrayList<>();

    public void addSession(Session session){
        this.sessions.add(session);
        session.setReservation(this);
    }
    public void removeSession(Session session){

        this.sessions.remove(session);
        session.setReservation(null);
    }

    public void addHistorique(HistoriqueReservation historiqueReservation)
    {

        this.historiques.add(historiqueReservation);
        historiqueReservation.setReservation(this);
    }
    public void removeHistorique(HistoriqueReservation historiqueReservation)
    {
        this.historiques.remove(historiqueReservation);
        historiqueReservation.setReservation(null);
    }
}
