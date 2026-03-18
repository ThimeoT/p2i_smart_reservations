package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.EquipementMapper;
import com.smart_reservation.api.dto.request.EquipementRequestDto;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.Exemplaire;
import com.smart_reservation.api.repository.EmpruntRepository;
import com.smart_reservation.api.repository.EquipementRepository;
import com.smart_reservation.api.repository.LabelRepository;
import com.smart_reservation.api.repository.RegleRelationEquipementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipementService {

    private final EquipementRepository equipementRepository;
    private final EmpruntRepository empruntRepository;
    private final ExemplaireService exemplaireService;
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
    @Transactional
    public EquipementResponseDto createEquipement(EquipementRequestDto equipementRequestDto) {
        Equipement equipement = equipementMapper.toEntity(equipementRequestDto);
        return equipementMapper.toDto(
                equipementRepository.save(equipement));
    }
    // TODO : Modifier un équipement

    @Transactional
    public EquipementResponseDto updateEquipement(EquipementRequestDto equipementRequestDto, Long id){
        Equipement equipement = equipementRepository.findById(id).orElseThrow(()-> new RessourceIntrouvableException("Equipement",id));
        equipementMapper.updateToEntity(equipementRequestDto,equipement);
        equipementRepository.save(equipement);
        return equipementMapper.toDto(equipement);
    }

    // TODO : Supprimer un équipement
    @Transactional
    public void deleteEquipement(Long id) {
        if(!empruntRepository.existsById(id))
        {
            throw new RessourceIntrouvableException("Equipement",id);
        }
        equipementRepository.deleteById(id);
    }

    // Règles sur les équipements

    // TODO : Ajouter une relation d'un équipement

    // TODO : Retirer une relation d'un équipement

    // TODO : Modifier une relation d'un équipement

    // TODO : Vérifier la conformité des relations d'un équipement



    // LABELS

    // TODO : Créer un label

    // TODO : Modifier un label

    // TODO : Retirer un label

    // TODO : Ajouter un label à un équipement

    // TODO : Retirer un label à un équipement

}
