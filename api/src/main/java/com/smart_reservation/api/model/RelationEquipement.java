package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "regles_relation_equipement")
public class RelationEquipement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "regle_relation_equipement_id")
    private Long id;

    @Column(name="statut_relation_equipement")
    private StatutRelationEquipement statutRelationEquipement;

    @ManyToOne(
            cascade = {CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinColumn(name = "equipement_id")
    private Equipement equipementSource;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "groupe_equipement_id")
    private List<Equipement> EquipementsCible;

    @Column
    private String commentaire;

}
