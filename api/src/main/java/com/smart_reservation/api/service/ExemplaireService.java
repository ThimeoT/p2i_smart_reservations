package com.smart_reservation.api.service;

import com.smart_reservation.api.model.Exemplaire;
import com.smart_reservation.api.repository.ExemplaireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExemplaireService {

    @Autowired
    private final ExemplaireRepository exemplaireRepository;
    // TODO : Ajouter un exemplaire

    // TODO : Modifier un exemplaire

    // TODO : Supprimer un exemplaire

    // TODO : changer statut exemplaire

    // TODO : Récupérer disponibilité exemplaire selon une période
    public List<Exemplaire> getExemplairesDisponibles(Long equipementId,
                                                      LocalDateTime dateDebut,
                                                      LocalDateTime dateFin) {
        return exemplaireRepository.findExemplairesDisponibles(equipementId, dateDebut, dateFin);
    }
    // TODO : Vérifier selon une période

}
