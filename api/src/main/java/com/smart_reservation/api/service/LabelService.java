package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.LabelMapper;
import com.smart_reservation.api.dto.request.LabelRequestDto;
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

    // TODO : Récupérer la liste des labels
    @Transactional
    public Iterable<LabelResponseDto> getLabels() {
        return labelMapper.toDtoIterable(labelRepository.findAll());
    }

    // TODO : Récupérer un label selon l'id
    @Transactional
    public Label getLabelEntityById(Long labelId) {
        return labelRepository.findById(labelId)
                .orElseThrow(() -> new RessourceIntrouvableException("Label", labelId));
    }
    @Transactional
    public LabelResponseDto getLabelById(Long labelId) {;
        return labelMapper.toDto(getLabelEntityById(labelId));
    }
    // TODO : Créer un label
    @Transactional
    public LabelResponseDto createLabel(LabelRequestDto labelRequestDto) {
        Label label = labelMapper.toEntity(labelRequestDto);
        return labelMapper.toDto(labelRepository.save(label));
    }
    // TODO : Modifier un label
    @Transactional
    public LabelResponseDto updateLabel(Long labelId, LabelRequestDto labelRequestDto) {
        Label label = labelRepository.findById(labelId)
                .orElseThrow(() -> new RessourceIntrouvableException("Label", labelId));
        labelMapper.updateEntity(labelRequestDto, label);
        return labelMapper.toDto(labelRepository.save(label));
    }

    // TODO : Retirer un label
    public void deleteLabelById(Long labelId) {
        if(!labelRepository.existsById(labelId)) {
            throw new RessourceIntrouvableException("Label", labelId);
        }
        labelRepository.deleteById(labelId);
    }
}
