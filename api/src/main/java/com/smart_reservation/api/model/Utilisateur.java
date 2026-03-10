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

    @Column
    private String prenom;

    @Column
    private String mail;

    @Column(name = "mot_de_passe_hash")
    private String motDePasseHash;

    @Column
    private String formation;

    @Column(name = "date_expiration")
    private LocalDate dateExpiration;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "liste_equipement_id")
    private ListeEquipement panier;

    @OneToMany(mappedBy = "utilisateur",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<ListeEquipement> listesEnregistrees = new ArrayList<>();

    @OneToMany(mappedBy = "utilisateur",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "utilisateur",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Emprunt> emprunts = new ArrayList<>();

    @Override
    public String toString() {
        return "User{" + "id=" + this.id + ", nom='" + this.nom + '\'' + ", prénom='" + this.prenom + '\'' + '}';
    }

    public void addEmprunt(Emprunt emprunt) {
        emprunts.add(emprunt);
    }
    public void removeEmprunt(Emprunt emprunt){
        emprunts.remove(emprunt);
    }

    public void addReservation(Reservation reservation)
    {
        reservations.add(reservation);
    }
    public void removeReservation(Reservation reservation)
    {
        reservations.remove(reservation);
    }


}
