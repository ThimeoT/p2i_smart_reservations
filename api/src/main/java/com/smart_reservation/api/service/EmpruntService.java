package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.EmpruntMapper;
import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.exception.EmpruntTermineAvantDebutSessionException;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Emprunt;
import com.smart_reservation.api.repository.EmpruntRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor

public class EmpruntService {

    private EmpruntRepository empruntRepository;
    private EmpruntMapper empruntMapper;
    // TODO : emprunter un exemplaire

    // TODO : retourner un exemplaire emprunté
    @Transactional
    public EmpruntResponseDto terminer(Long id)
    {
        Emprunt emprunt = empruntRepository.findById(id).orElseThrow(()-> new RessourceIntrouvableException("Emprunt",id));
        LocalDateTime dateRetourReelle = LocalDateTime.now();
        if(dateRetourReelle.isBefore(emprunt.getSession().getDebut()))
        {
            throw new EmpruntTermineAvantDebutSessionException(id,emprunt.getSession().getDebut());
        }

        emprunt.setDateRetourReelle(dateRetourReelle);
        empruntRepository.save(emprunt);
        return empruntMapper.toDto(emprunt);
    }
    // (marque l'utilisateur en retard si besoin, etc)

    // TODO : supprimer un emprunt

    // TODO : Récupérer la liste des emprunts

    // TODO : Récupérer la liste des emprunts d'une personne

    // TODO : Récupérer la lise des emprunts d'un exemplaire

    // TODO : Récupérer la liste des emprunts d'un équipement

    // TODO : Récupérer la liste des emprunts selon une période

    // TODO : Récupérer un emprunt


}
