package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "regles_relation_equipement")
public class RelationEquipement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "regle_relation_equipement_id")
    private Long id;

    @Column(name="statut_relation_equipement", nullable = false, columnDefinition = "VARCHAR(50)")
    private StatutRelationEquipement statutRelationEquipement;

    @ManyToOne
    @JoinColumn(name = "equipement_id", nullable = false)
    private Equipement equipementSource;

    @ManyToMany
    @JoinTable(
            name = "relation_equipement_cible",
            joinColumns = @JoinColumn(name = "relation_id"),
            inverseJoinColumns = @JoinColumn(name = "equipement_cible_id")
    )
    private List<Equipement> equipementsCible = new ArrayList<>();

    @Column
    private String commentaire;

    public void addEquipementCible(Equipement equipement) {
        this.equipementsCible.add(equipement);
    }
    public void removeEquipementCible(Equipement equipement) {
        this.equipementsCible.remove(equipement);
    }

}
