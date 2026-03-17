package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.ListeEquipementsMapper;
import com.smart_reservation.api.dto.request.ListeEquipementsRequestDto;
import com.smart_reservation.api.dto.request.UtilisateurRequestDto;
import com.smart_reservation.api.dto.response.ListeEquipementsResponseDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.dto.resume.UtilisateurResumeDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.ListeEquipements;
import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.dto.mapper.UtilisateurMapper;
import com.smart_reservation.api.repository.EquipementRepository;
import com.smart_reservation.api.repository.ListeEquipementsRepository;
import com.smart_reservation.api.repository.UtilisateurRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final ListeEquipementsRepository listeEquipementsRepository;

    private final ListeEquipementsMapper listeEquipementsMapper;

    private final UtilisateurRepository utilisateurRepository;

    private final EquipementRepository equipementRepository;

    private final UtilisateurMapper utilisateurMapper;

    private Boolean existsById(final long id) {
        return utilisateurRepository.existsById(id);
    }

    @Transactional(readOnly = true)
    public UtilisateurResponseDto getUtilisateur(final Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id).orElseThrow(
                () -> new RessourceIntrouvableException("Utilisateur", id)
        );
        return utilisateurMapper.toDto(utilisateur);
    }

    @Transactional(readOnly = true)
    public Iterable<UtilisateurResumeDto> getUtilisateurs() {
        return utilisateurMapper.toResumeDtoIterable(
                utilisateurRepository.findAll());
    }

    @Transactional
    public void deleteUtilisateur(final Long id) {

        if (!existsById(id)) {
            throw new RessourceIntrouvableException("Utilisateur", id);
        }
        utilisateurRepository.deleteById(id);
    }

    @Transactional
    public UtilisateurResponseDto saveUtilisateur(UtilisateurRequestDto utilisateurRequestDto) {

        Utilisateur utilisateur = utilisateurMapper.toEntity(utilisateurRequestDto);
        return utilisateurMapper.toDto(
                utilisateurRepository.save(utilisateur));
    }

    @Transactional
    public UtilisateurResponseDto updateUtilisateur(Long id, UtilisateurRequestDto utilisateurRequestDto) {

        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RessourceIntrouvableException("Utilisateur", id));
        utilisateurMapper.updateEntity(utilisateurRequestDto, utilisateur);
        utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toDto(utilisateur);
    }

    @Transactional(readOnly = true)
    public Iterable<ListeEquipementsResponseDto> getListesEquipements(long idUtilisateur) {

        if (!utilisateurRepository.existsById(idUtilisateur)) {
            throw new RessourceIntrouvableException("Utilisateur", idUtilisateur);
        }
        return listeEquipementsMapper.toDtoIterable(
                listeEquipementsRepository.findByUtilisateurId(idUtilisateur));
    }

    @Transactional
    public void deleteListeEquipements(Long idListe) {

        ListeEquipements liste = listeEquipementsRepository.findById(idListe).orElseThrow(() -> new RessourceIntrouvableException("Liste d'équipements", idListe));
        listeEquipementsRepository.delete(liste);
    }

    @Transactional(readOnly = true)
    public ListeEquipementsResponseDto getListeEquipements(Long idListe) {

        ListeEquipements liste = listeEquipementsRepository.findById(idListe).orElseThrow(() -> new RessourceIntrouvableException("Liste d'équipements", idListe));

        return listeEquipementsMapper.toDto(liste);
    }

    @Transactional
    public ListeEquipementsResponseDto updateListeEquipements(Long idListe, ListeEquipementsRequestDto listeEquipementsDto) {

        ListeEquipements liste = listeEquipementsRepository.findById(idListe).orElseThrow(() -> new RessourceIntrouvableException("Liste d'équipements", idListe));
        listeEquipementsMapper.updateEntity(listeEquipementsDto, liste);
        liste.setEquipements(getEquipementsFromIdList(listeEquipementsDto.equipementsId));
        listeEquipementsRepository.save(liste);

        return listeEquipementsMapper.toDto(liste);
    }

    @Transactional
    public ListeEquipementsResponseDto createListeEquipements(Long utilisateurId, ListeEquipementsRequestDto listeEquipementsDto) {

        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new
                RessourceIntrouvableException("Utilisateur", utilisateurId));
        ListeEquipements liste = listeEquipementsMapper.toEntity(listeEquipementsDto);
        liste.setUtilisateur(utilisateur);
        liste.setEquipements(getEquipementsFromIdList(listeEquipementsDto.equipementsId));
        listeEquipementsRepository.save(liste);

        return listeEquipementsMapper.toDto(liste);
    }

    private List<Equipement> getEquipementsFromIdList(List<Long> equipementsId) {

        return equipementsId.stream()
                .map(id -> equipementRepository.findById(id)
                        .orElseThrow(() -> new RessourceIntrouvableException("Equipement", id)))
                .toList();
    }

}