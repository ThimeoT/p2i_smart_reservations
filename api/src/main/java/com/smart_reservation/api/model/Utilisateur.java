package com.smart_reservation.api.model;

import jakarta.persistence.*;


import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "utilisateurs")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "utilisateur_id")
    private Long id;

    @Column
    private String nom;

    @Column(unique = true, nullable = false)
    private String prenom;

    @Column
    private String mail;

    @Column(name = "mot_de_passe_hash")
    private String motDePasseHash;

    @Column
    private String formation;

    @Column(name = "date_expiration")
    private LocalDate dateExpiration;

    @ManyToMany
    @JoinTable(
            name = "utilisateur_equipements_favoris",
            joinColumns = @JoinColumn(name = "utilisateur_id"),
            inverseJoinColumns = @JoinColumn(name = "equipement_id")
    )
    private List<Equipement> equipementsFavoris = new ArrayList<>();

    @OneToMany(mappedBy = "utilisateur",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<ListeEquipement> listesEnregistrees = new ArrayList<>();

    public void addEquipementFavori(Equipement equipement) {
        equipementsFavoris.add(equipement);
    }
    public void removeEquipementFavori(Equipement equipement){
        equipementsFavoris.remove(equipement);
    }

}
