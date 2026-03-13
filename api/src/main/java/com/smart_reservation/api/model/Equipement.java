package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "equipements")
public class Equipement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipement_id")
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column
    private String description;

    @Column(name = "url_image")
    private String urlImage;

    @ManyToMany
    @JoinTable(
            name = "equipement_label",
            joinColumns = @JoinColumn(name = "equipement_id"),
            inverseJoinColumns = @JoinColumn(name = "label_id")
    )
    private List<Label> labels = new ArrayList<>();

    @OneToMany(mappedBy = "equipement", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exemplaire> exemplaires = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "lien_ressources", joinColumns = @JoinColumn(name = "equipement_id"))
    @Column(name = "lien_ressources")
    private List<String> liensRessources = new ArrayList<>();


    @OneToMany(mappedBy="equipementSource")
    private List<RelationEquipement> relationsEquipement = new ArrayList<>();

    public void addLabel(Label label) {
        labels.add(label);
    }

    public void removeLabel(Label label) {
        labels.remove(label);
    }

    public void addExemplaire(Exemplaire exemplaire) {
        exemplaires.add(exemplaire);
        exemplaire.setEquipement(this);
    }

    public void removeExemplaire(Exemplaire exemplaire) {
        exemplaires.remove(exemplaire);
        exemplaire.setEquipement(null);
    }

    public void addLienRessource(String lienRessource) {
        liensRessources.add(lienRessource);
    }

    public void removeLienRessource(String lienRessource) {
        liensRessources.remove(lienRessource);
    }

    public void addRelationEquipement(RelationEquipement relationEquipement) {
        relationsEquipement.add(relationEquipement);
        relationEquipement.setEquipementSource(this);
    }
    public void removeRelationEquipement(RelationEquipement relationEquipement) {
        relationsEquipement.remove(relationEquipement);
        relationEquipement.setEquipementSource(null);
    }

}
