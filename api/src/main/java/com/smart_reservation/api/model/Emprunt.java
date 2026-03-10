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

    @ManyToOne(
            cascade = {CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinColumn(name="utilisateur_id")
    private Utilisateur utilisateur;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne
    @JoinColumn(name = "exemplaire_id")
    private Exemplaire exemplaire;

    @Column
    private LocalDateTime dateRetourPrevue;

    @Column
    private LocalDateTime dateRetourReelle;
}
