package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "listes_equipements")
public class ListeEquipement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liste_equipement_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="utilisateur_id")
    private Utilisateur utilisateur;

    @Column
    private String nom;

    @Column
    private String description;

    @ManyToMany
    @JoinTable(
            name = "liste_equipement_equipements",
            joinColumns = @JoinColumn(name = "liste_equipement_id"),
            inverseJoinColumns = @JoinColumn(name = "equipement_id")
    )
    private List<Equipement> equipements = new ArrayList<>();
}
