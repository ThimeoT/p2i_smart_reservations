package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.ExemplaireMapper;
import com.smart_reservation.api.dto.request.ExemplaireRequestDto;
import com.smart_reservation.api.dto.response.ExemplaireResponseDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.Exemplaire;
import com.smart_reservation.api.model.StatutDisponibilite;
import com.smart_reservation.api.repository.ExemplaireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExemplaireService {

    private final EquipementService equipementService;
    private final ExemplaireRepository exemplaireRepository;
    private final ExemplaireMapper exemplaireMapper;

    // TODO : Ajouter un exemplaire
    @Transactional
    public ExemplaireResponseDto createExemplaire(ExemplaireRequestDto exemplaireRequestDto) {
        Exemplaire exemplaire = exemplaireMapper.toEntity(exemplaireRequestDto);
        Equipement equipement = equipementService.getEquipementEntity(exemplaireRequestDto.equipementId);
        equipement.addExemplaire(exemplaire);
        return exemplaireMapper.toDto(exemplaireRepository.save(exemplaire));
    }

    // TODO : Modifier un exemplaire

    @Transactional
    public ExemplaireResponseDto updateExemplaire(Long exemplaireId, ExemplaireRequestDto exemplaireRequestDto) {
        Exemplaire exemplaire = exemplaireRepository.findById(exemplaireRequestDto.id)
                .orElseThrow(() -> new RessourceIntrouvableException("Exemplaire", exemplaireRequestDto.id));
        exemplaireMapper.updateToEntity(exemplaireRequestDto, exemplaire);
        return exemplaireMapper.toDto(
                exemplaireRepository.save(exemplaire));
    }

    // TODO : Supprimer un exemplaire
    @Transactional
    public void deleteExemplaire(Long exemplaireId) {
        if(!exemplaireRepository.existsById(exemplaireId)) {
            throw new RessourceIntrouvableException("Exemplaire", exemplaireId);
        }
        exemplaireRepository.deleteById(exemplaireId);
    }

    // TODO : changer statut exemplaire
    public ExemplaireResponseDto updateStatutExemplaireFromExemplaire(Long exemplaireId, StatutDisponibilite statut)
    {
        Exemplaire exemplaire = exemplaireRepository.findById(exemplaireId)
                .orElseThrow(() -> new RessourceIntrouvableException("Exemplaire", exemplaireId));
        exemplaire.setStatutDisponibilite(statut);
        return exemplaireMapper.toDto(exemplaireRepository.save(exemplaire));
    }

    // TODO : Récupérer disponibilité exemplaire selon une période
    public List<Exemplaire> getExemplairesDisponibles(Long equipementId,
                                                      LocalDateTime dateDebut,
                                                      LocalDateTime dateFin) {
        return exemplaireRepository.findExemplairesDisponibles(equipementId, dateDebut, dateFin);
    }

}
