package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.EmpruntMapper;
import com.smart_reservation.api.dto.response.EmpruntResponseDto;
import com.smart_reservation.api.exception.EmpruntTermineAvantDebutSessionException;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.*;
import com.smart_reservation.api.repository.EmpruntRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmpruntService {

    private final EmpruntRepository empruntRepository;
    private final EmpruntMapper empruntMapper;
    private final ExemplaireService exemplaireService;
    private final EquipementService equipementService;

    public Boolean existsById(Long id)
    {
        if(!empruntRepository.existsById(id))
        {
            throw new RessourceIntrouvableException("Emprunt",id);
        }
        return true;
    }

    @Transactional
    public Iterable<Emprunt> getEmpruntsBySessionId(Long sessionId)
    {
        return empruntRepository.findAllBySession_Id(sessionId);
    }

    @Transactional
    public Iterable<Emprunt> getEmpruntsByDateDebutAndDateFin(LocalDateTime dateDebut, LocalDateTime dateFin)
    {
        return empruntRepository.findAllBySession_DebutAfterAndSession_FinBefore(dateDebut,dateFin);
    }

    @Transactional
    public Iterable<EmpruntResponseDto> getEmpruntsByEquipementAndDateDebutAndDateFin(Long equipementId, LocalDateTime debut, LocalDateTime fin)
    {
        equipementService.getEquipement(equipementId);
        return empruntMapper.toDtoIterable(empruntRepository
                .findAllByExemplaire_Equipement_IdAndSession_DebutLessThanAndSession_FinGreaterThan(
                        equipementId, fin, debut
                ));
    }

    @Transactional
    public Iterable<EmpruntResponseDto> getEmpruntsByExemplaireAndDateDebutAndDateFin(Long exemplaireId, LocalDateTime debut, LocalDateTime fin)
    {
        exemplaireService.getExemplaire(exemplaireId);
        return empruntMapper.toDtoIterable(empruntRepository
                .findAllByExemplaire_IdAndSession_DebutLessThanAndSession_FinGreaterThan(
                        exemplaireId, fin, debut
                ));
    }

    @Transactional
    public EmpruntResponseDto getEmprunt(Long id)
    {
        return empruntMapper.toDto(getEmpruntEntity(id));
    }


    @Transactional
    public Emprunt getEmpruntEntity(Long id)
    {
        return empruntRepository.findById(id).orElseThrow(()->new RessourceIntrouvableException("Emprunt",id));
    }

    // TODO : ajouter un emprunt à un exemplaire
    @Transactional
    public Emprunt createEmprunt(Exemplaire exemplaire, Session session)
    {
        Emprunt emprunt = new Emprunt();
        emprunt.setExemplaire(exemplaire);
        emprunt.setSession(session);
        emprunt.setStatut(StatutEmprunt.PLANIFIE);
        emprunt.setDateRetourPrevue(session.getFin());
        return emprunt;
    }

    // TODO : retourner un exemplaire emprunté
    @Transactional
    public EmpruntResponseDto terminer(Long id)
    {
        Emprunt emprunt = getEmpruntEntity(id);
        LocalDateTime dateRetourReelle = LocalDateTime.now();
        if(dateRetourReelle.isBefore(emprunt.getSession().getDebut()))
        {
            throw new EmpruntTermineAvantDebutSessionException(id,emprunt.getSession().getDebut());
        }
        emprunt.setDateRetourReelle(dateRetourReelle);
        emprunt.setStatut(StatutEmprunt.TERMINE);
        empruntRepository.save(emprunt);
        return empruntMapper.toDto(emprunt);
    }

    @Transactional
    public EmpruntResponseDto annuler(Long id)
    {
        Emprunt emprunt = getEmpruntEntity(id);
        LocalDateTime dateRetourReelle = LocalDateTime.now();
        emprunt.setStatut(StatutEmprunt.ANNULE);
        empruntRepository.save(emprunt);
        return empruntMapper.toDto(emprunt);
    }
    // (marque l'utilisateur en retard si besoin, etc)

    // TODO : supprimer un emprunt
    @Transactional
    public void deleteEmprunt(Long id)
    {
        if(!empruntRepository.existsById(id)){
            throw new RessourceIntrouvableException("Emprunt",id);
        }
        empruntRepository.deleteById(id);
    }




    // TODO : Récupérer la liste des emprunts
    @Transactional
    public Iterable<EmpruntResponseDto> getEmprunts(){
        return empruntMapper.toDtoIterable(empruntRepository.findAll());
    }


}
