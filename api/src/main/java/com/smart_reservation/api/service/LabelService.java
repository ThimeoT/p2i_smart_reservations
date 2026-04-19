package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.LabelMapper;
import com.smart_reservation.api.dto.request.LabelRequestDto;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.response.LabelResponseDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Label;
import com.smart_reservation.api.repository.LabelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;
    private final LabelMapper labelMapper;
    private final EquipementService equipementService;

    @Transactional
    public Iterable<LabelResponseDto> getLabels() {
        return labelMapper.toDtoIterable(labelRepository.findAll());
    }

    @Transactional
    public Label getLabelEntity(Long labelId) {
        return labelRepository.findById(labelId)
                .orElseThrow(() -> new RessourceIntrouvableException("Label", labelId));
    }

    @Transactional
    public LabelResponseDto getLabel(Long labelId) {
        return labelMapper.toDto(getLabelEntity(labelId));
    }

    @Transactional
    public LabelResponseDto createLabel(LabelRequestDto labelRequestDto) {
        Label label = labelMapper.toEntity(labelRequestDto);
        return labelMapper.toDto(labelRepository.save(label));
    }

    @Transactional
    public LabelResponseDto updateLabel(Long labelId, LabelRequestDto labelDto) {
        if (labelId == null) throw new IllegalArgumentException("Id nécessaire pour mettre le label à jour");
        Label label = labelRepository.findById(labelId)
                .orElseThrow(() -> new RessourceIntrouvableException("Label", labelId));
        labelMapper.updateEntity(labelDto, label);
        return labelMapper.toDto(labelRepository.save(label));
    }

    @Transactional
    public void deleteLabelById(Long labelId) {
        Label label = getLabelEntity(labelId);
        equipementService.removeLabelFromAllEquipements(label);
        labelRepository.delete(label);
    }

    @Transactional
    public EquipementResponseDto addLabelToEquipement(Long labelId, Long equipementId) {
        return equipementService.addLabelToEquipement(getLabelEntity(labelId), equipementId);
    }

    @Transactional
    public EquipementResponseDto removeLabelFromEquipement(Long labelId, Long equipementId) {
        return equipementService.removeLabelFromEquipement(getLabelEntity(labelId), equipementId);
    }
}
