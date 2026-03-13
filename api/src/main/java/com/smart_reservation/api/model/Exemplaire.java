package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "exemplaires")
public class Exemplaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exemplaire_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name= "equipement_id")
    private Equipement equipement;

    @Column(name = "statut_disponibilite")
    private StatutDisponibilite statutDisponibilite;
}
