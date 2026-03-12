package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.UtilisateurDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.mapper.UtilisateurMapper;
import com.smart_reservation.api.repository.UtilisateurRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    private final UtilisateurMapper utilisateurMapper;

    public Boolean existsById(final long id)
    {
        return utilisateurRepository.existsById(id);
    }

    public UtilisateurDto getUtilisateur(final Long id) {
        Utilisateur utilisateur =  utilisateurRepository.findById(id).orElseThrow(
                ()-> new RessourceIntrouvableException("Utilisateur", id)
        );
        return utilisateurMapper.toDto(utilisateur);
    }

    public Iterable<UtilisateurDto> getUtilisateurs()
    {
        Iterable<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        return utilisateurMapper.toDtoIterable(utilisateurs);
    }

    public void deleteUtilisateur(final Long id) {
        if(!existsById(id))
        {
            throw new RessourceIntrouvableException("Utilisateur", id);
        }
        utilisateurRepository.deleteById(id);
    }

    public UtilisateurDto saveUtilisateur(UtilisateurDto utilisateurDto) {
        Utilisateur utilisateur = utilisateurMapper.toEntity(utilisateurDto);
        Utilisateur utilisateurSauvegarde = utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toDto(utilisateurSauvegarde);
    }
    
    public UtilisateurDto updateUtilisateur(UtilisateurDto utilisateurDto) {
        if(!existsById(utilisateur.getId()))
        {
            throw new IllegalArgumentException("ERREUR : id non trouvé");
        }
        return saveUtilisateur(utilisateur);
        }
    

    // TODO : ajouter/modifier listeEquipement
    // TODO : retirer listeEquipement
    // TODO : récupérer listeEquipement
    // TODO : ajouter un équipement à une listeEquipement
    // TODO : supprimer un équipement à une listeEquipement (si c'est la dernière, supprimer la liste
}