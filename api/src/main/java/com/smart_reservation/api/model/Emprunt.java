package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "emprunts")
public class Emprunt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emprunt_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "exemplaire_id", nullable = false)
    private Exemplaire exemplaire;



    @Column
    private LocalDateTime dateRetourPrevue;

    @Column
    private LocalDateTime dateRetourReelle;

    @Column
    private StatutEmprunt statut;
}
