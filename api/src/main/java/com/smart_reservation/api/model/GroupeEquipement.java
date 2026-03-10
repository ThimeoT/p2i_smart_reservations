package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name="groupes_equipement")
public class GroupeEquipement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "groupe_equipement_id")
    private long id;

    @OneToOne(mappedBy = "groupeEquipement")
    private RelationEquipement relationEquipement;

    @ManyToMany( // je l'ai fait en unidirectionnel, mais pas sûr de ça
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinTable(
            name = "groupe_equipement_equipements",
            joinColumns = @JoinColumn(name = "groupe_equipement_id"),
            inverseJoinColumns = @JoinColumn(name = "equipement_id")
    )
    private List<Equipement> equipements = new ArrayList<>();
    
    public void addEquipement(Equipement equipement) {
        equipements.add(equipement);
    }

    public void removeEquipement(Equipement equipement) {
        equipements.remove(equipement);
    }
}
