package com.smart_reservation.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @OneToMany(mappedBy = "session",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Emprunt> emprunts = new ArrayList<>();

    @Column
    private LocalDateTime debut;

    @Column
    private LocalDateTime fin;

    public void addEmprunt(Emprunt emprunt) {
        this.emprunts.add(emprunt);
        emprunt.setSession(this);
    }

    public void removeEmprunt(Emprunt emprunt) {
        this.emprunts.remove(emprunt);
        emprunt.setSession(null);
    }
}
