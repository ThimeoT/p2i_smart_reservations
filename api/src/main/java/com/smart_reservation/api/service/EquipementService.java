package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.EquipementMapper;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.repository.EmpruntRepository;
import com.smart_reservation.api.repository.EquipementRepository;
import com.smart_reservation.api.repository.LabelRepository;
import com.smart_reservation.api.repository.RegleRelationEquipementRepository;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventaireService {

    private final EquipementRepository equipementRepository;
    private final LabelRepository labelRepository;
    private final EmpruntRepository empruntRepository;
    private final RegleRelationEquipementRepository regleRelationEquipementRepository;

    private final EquipementMapper equipementMapper;

    // EQUIPEMENTS

    // TODO : Récupérer tous les équipements

    @Transactional
    public Iterable<EquipementResumeDto> getEquipements() {
        return equipementMapper.toResumeDtoIterable(equipementRepository.findAll());
    }

    // TODO : Récupérer les équipements selon l'id
    @Transactional
    public EquipementResponseDto getEquipement(Long id) {
        return equipementMapper.toDto(
                equipementRepository.findById(id).orElseThrow(
                        () -> new RessourceIntrouvableException("Equipement",id)
                )
        );
    }

    // TODO : Récupérer les équipements selon un label
    @Transactional
    public Iterable<EquipementResumeDto> getEquipementsByLabelId(List<Long> labelIds)
    {
        return equipementMapper.toResumeDtoIterable(
                equipementRepository.findByLabels_IdIn(labelIds)
        );
    }


    // TODO : Ajouter un équipement

    // TODO : Modifier un équipement

    // TODO : Supprimer un équipement



    // TODO : Vérifier la disponibilité d'un équipement selon la période

    // Règles sur les équipements

    // TODO : Ajouter une relation d'un équipement

    // TODO : Retirer une relation d'un équipement

    // TODO : Modifier une relation d'un équipement

    // TODO : Vérifier la conformité des relations d'un équipement


    // EXEMPLAIRES

    // TODO : Ajouter un exemplaire

    // TODO : Modifier un exemplaire

    // TODO : Supprimer un exemplaire

    // TODO : changer statut exemplaire

    // TODO : Récupérer disponibilité exemplaire selon une période

    // TODO : Vérifier selon une période

    // LABELS

    // TODO : Créer un label

    // TODO : Modifier un label

    // TODO : Retirer un label

    // TODO : Ajouter un label à un équipement

    // TODO : Retirer un label à un équipement

}
