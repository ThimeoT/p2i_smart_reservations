package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.mapper.UtilisateurMapper;
import com.smart_reservation.api.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    private final UtilisateurMapper utilisateurMapper;

    public Boolean existsById(final long id)
    {
        return utilisateurRepository.existsById(id);
    }

    public UtilisateurResponseDto getUtilisateur(final Long id) {
        Utilisateur utilisateur =  utilisateurRepository.findById(id).orElseThrow(
                ()-> new RessourceIntrouvableException("Utilisateur", id)
        );
        return utilisateurMapper.toDto(utilisateur);
    }

    public Iterable<UtilisateurResponseDto> getUtilisateurs()
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

    public UtilisateurResponseDto saveUtilisateur(UtilisateurResponseDto utilisateurResponseDto) {
        Utilisateur utilisateur = utilisateurMapper.toEntity(utilisateurResponseDto);
        Utilisateur utilisateurSauvegarde = utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toDto(utilisateurSauvegarde);
    }
    
    public UtilisateurResponseDto updateUtilisateur(Long id, UtilisateurResponseDto utilisateurResponseDto) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RessourceIntrouvableException("Utilisateur",id));
        utilisateurMapper.updateEntityFromDto(utilisateurResponseDto);
        return saveUtilisateur(utilisateurResponseDto);
        }
    

    // TODO : ajouter/modifier listeEquipement
    // TODO : retirer listeEquipement
    // TODO : récupérer listeEquipement
    // TODO : ajouter un équipement à une listeEquipement
    // TODO : supprimer un équipement à une listeEquipement (si c'est la dernière, supprimer la liste
}