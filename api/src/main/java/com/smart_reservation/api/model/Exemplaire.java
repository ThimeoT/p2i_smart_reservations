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

    @Column(name="nom_serie")
    private String nomSerie;

    @ManyToOne
    @JoinColumn(name= "equipement_id", nullable = false)
    private Equipement equipement;

    @Column(name = "statut_disponibilite")
    private StatutDisponibilite statutDisponibilite;

    @OneToMany(mappedBy = "exemplaire",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Emprunt> emprunts = new ArrayList<>();
}
