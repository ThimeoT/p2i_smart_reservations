package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.EquipementMapper;
import com.smart_reservation.api.dto.mapper.RelationEquipementMapper;
import com.smart_reservation.api.dto.request.EquipementRequestDto;
import com.smart_reservation.api.dto.request.RelationEquipementRequestDto;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.response.RelationEquipementResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.exception.EquipementRequisManquantException;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.Label;
import com.smart_reservation.api.model.RelationEquipement;
import com.smart_reservation.api.model.StatutRelationEquipement;
import com.smart_reservation.api.repository.EquipementRepository;
import com.smart_reservation.api.repository.RelationEquipementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.InvalidAttributeValueException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class EquipementService {

    private final EquipementRepository equipementRepository;
    private final RelationEquipementMapper relationEquipementMapper;
    private final RelationEquipementRepository relationEquipementRepository;
    private final LabelService labelService;

    private final EquipementMapper equipementMapper;

    // EQUIPEMENTS

    // TODO : Récupérer tous les équipements

    @Transactional
    public Iterable<EquipementResumeDto> getEquipements() {
        return equipementMapper.toResumeDtoIterable(equipementRepository.findAll());
    }

    // TODO : Récupérer les équipements selon l'id
    @Transactional
    public Equipement getEquipementEntity(Long id) {
        return equipementRepository.findById(id).orElseThrow(
                () -> new RessourceIntrouvableException("Equipement", id)
        );
    }

    @Transactional
    public EquipementResponseDto getEquipement(Long id) {
        return equipementMapper.toDto(getEquipementEntity(id));
    }

    // TODO : Récupérer les équipements selon un label
    @Transactional
    public Iterable<EquipementResumeDto> getEquipementsByLabelId(List<Long> labelIds) {
        return equipementMapper.toResumeDtoIterable(
                equipementRepository.findByLabels_IdIn(labelIds)
        );
    }

    @Transactional
    public List<Equipement> getEquipementsEntities(List<Long> ids) {
        List<Equipement> equipements = new ArrayList<>();
        for (Long id : ids) {
            equipements.add(getEquipementEntity(id));
        }
        return equipements;
    }

    // TODO : Ajouter un équipement
    @Transactional
    public EquipementResponseDto createEquipement(EquipementRequestDto equipementDto) {
        Equipement equipement = equipementMapper.toEntity(equipementDto);
        updateRelationsEquipementsFromEquipement(equipementDto.relationsEquipement, equipement);
        return equipementMapper.toDto(
                equipementRepository.save(equipement));
    }
    // TODO : Modifier un équipement

    @Transactional
    public EquipementResponseDto updateEquipement(EquipementRequestDto equipementDto, Long id) {
        Equipement equipement = equipementRepository.findById(id)
                .orElseThrow(() -> new RessourceIntrouvableException("Equipement", id));
        equipementMapper.updateToEntity(equipementDto, equipement);
        updateRelationsEquipementsFromEquipement(equipementDto.relationsEquipement, equipement);
        equipementRepository.save(equipement);
        return equipementMapper.toDto(equipement);
    }

    // TODO : Supprimer un équipement
    @Transactional
    public void deleteEquipement(Long id) throws RessourceIntrouvableException {
        if (!equipementRepository.existsById(id)) {
            throw new RessourceIntrouvableException("Equipement", id);
        }
        equipementRepository.deleteById(id);
    }

    // Règles sur les équipements

    // TODO : Ajouter une relation d'un équipement
    @Transactional
    public RelationEquipementResponseDto createRelationEquipementFromEquipement(RelationEquipementRequestDto relationEquipementRequestDto, Long equipementId) {
        Equipement source = equipementRepository.findById(equipementId).orElseThrow(() -> new RessourceIntrouvableException("Equipement", equipementId));
        List<Equipement> cibles = new ArrayList<>();
        for (Long cibleId : relationEquipementRequestDto.equipementsCibleId) {
            cibles.add(
                    equipementRepository.findById(cibleId)
                            .orElseThrow(() -> new RessourceIntrouvableException("Equipement", cibleId)
                            )
            );
        }
        RelationEquipement relationEquipement = relationEquipementMapper.toEntity(relationEquipementRequestDto);
        relationEquipement.setEquipementsCible(cibles);
        source.addRelationEquipement(relationEquipement);
        this.relationEquipementRepository.save(relationEquipement);
        return relationEquipementMapper.toDto(relationEquipement);
    }

    @Transactional
    public void updateRelationsEquipementsFromEquipement(List<RelationEquipementRequestDto> relationsDtos, Equipement equipement) {
        List<RelationEquipement> relationsExistantes = equipement.getRelationsEquipement();

        relationsExistantes.removeIf(relation ->
                relationsDtos.stream().noneMatch(dto -> dto.id != null && dto.id.equals(relation.getId()))
        );

        for (RelationEquipementRequestDto dto : relationsDtos) {
            if (dto.id != null) {

                RelationEquipement relation = relationsExistantes.stream()
                        .filter(r -> r.getId().equals(dto.id))
                        .findFirst()
                        .orElseThrow(() -> new RessourceIntrouvableException("Relation", dto.id));
                relationEquipementMapper.updateEntity(dto, relation);
                relation.setEquipementsCible(getEquipementsEntities(dto.equipementsCibleId));
            } else {

                RelationEquipement relation = relationEquipementMapper.toEntity(dto);
                relation.setEquipementSource(equipement);
                relation.setEquipementsCible(getEquipementsEntities(dto.equipementsCibleId));
                relationsExistantes.add(relation);
            }
        }
    }

    // TODO : Retirer une relation d'un équipement
    @Transactional
    public void deleteRelationEquipementFromEquipement(Long relationId, Long equipementId) throws Exception {
        RelationEquipement relationEquipement = relationEquipementRepository.findById(relationId)
                .orElseThrow(() -> new RessourceIntrouvableException("Règle de relation d'équipements", relationId));
        Long idEquipementDeduit = relationEquipement.getEquipementSource().getId();
        if (!Objects.equals(idEquipementDeduit, equipementId)) {
            throw new InvalidAttributeValueException("Attendait l'id d'équipement source " + equipementId + "mais la relation possède comme id source " + idEquipementDeduit);
        }
        relationEquipementRepository.delete(relationEquipement);
    }

    // TODO : Modifier une relation
    @Transactional
    public RelationEquipementResponseDto updateRelationEquipement(RelationEquipementRequestDto relationDto) {
        RelationEquipement relation = relationEquipementRepository.findById(relationDto.id).orElseThrow(() -> new RessourceIntrouvableException("Relation d'équipements", relationDto.id));
        relationEquipementMapper.updateEntity(relationDto, relation);
        relation.setEquipementsCible(getEquipementsEntities(relationDto.equipementsCibleId));
        relationEquipementRepository.save(relation);
        return relationEquipementMapper.toDto(relation);
    }
    //

    // TODO : Vérifier la conformité des relations d'un ensemble d'équipements réservés
    public Boolean verifierRelationsEquipement(List<Equipement> equipements) {
        Set<Equipement> setEquipements = new HashSet<>(equipements);
        for (Equipement equipement : equipements) {
            for (RelationEquipement relationEquipement : relationEquipementRepository.findByEquipementSourceIdAndStatutRelationEquipement(equipement.getId(), StatutRelationEquipement.REQUIS)) {

                if (!setEquipements.containsAll(relationEquipement.getEquipementsCible()))
                    throw new EquipementRequisManquantException(equipement.getId());
            }
        }
        return true;
    }

    // LABELS
    @Transactional
    public EquipementResponseDto addLabelToEquipement(Long labelId, Long equipementId) {
        Equipement equipement = equipementRepository.findById(equipementId).orElseThrow(() -> new RessourceIntrouvableException("Equipement", equipementId));
        Label label = labelService.getLabelEntity(labelId);
        equipement.addLabel(label);
        return equipementMapper.toDto(equipementRepository.save(equipement));
    }

    @Transactional
    public EquipementResponseDto removeLabelFromEquipement(Long labelId, Long equipementId) {
        Equipement equipement = equipementRepository.findById(equipementId).orElseThrow(() -> new RessourceIntrouvableException("Equipement", equipementId));
        Label label = labelService.getLabelEntity(labelId);
        equipement.removeLabel(label);
        return equipementMapper.toDto(equipementRepository.save(equipement));
    }


}
