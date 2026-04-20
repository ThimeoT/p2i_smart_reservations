package com.smart_reservation.api.serviceTests;

import com.smart_reservation.api.dto.mapper.LabelMapper;
import com.smart_reservation.api.dto.request.LabelRequestDto;
import com.smart_reservation.api.dto.response.LabelResponseDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Label;
import com.smart_reservation.api.repository.LabelRepository;
import com.smart_reservation.api.service.EquipementService;
import com.smart_reservation.api.service.LabelService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LabelServiceTests {

    @Mock
    private LabelRepository labelRepository;

    @Mock
    private LabelMapper labelMapper;

    @Mock
    private EquipementService equipementService;

    @InjectMocks
    private LabelService labelService;

    private Label label1;
    private Label label2;
    private LabelResponseDto labelDto1;
    private LabelRequestDto requestDto;

    @BeforeEach
    void setUp() {
        label1 = new Label();
        label1.setId(1L);
        label1.setNom("Audiovisuel");
        label1.setDescription("Matériel audiovisuel");
        label1.setColor("#FF5733");

        label2 = new Label();
        label2.setId(2L);
        label2.setNom("Mobilité");
        label2.setDescription("Équipements mobiles");
        label2.setColor("#33FF57");

        labelDto1 = new LabelResponseDto();
        labelDto1.id = 1L;
        labelDto1.nom = "Audiovisuel";

        requestDto = new LabelRequestDto();
        requestDto.nom = "Audiovisuel";
        requestDto.description = "Matériel audiovisuel";
        requestDto.color = "#FF5733";
    }

    // -------------------------------------------------------------------------
    // getLabels
    // -------------------------------------------------------------------------

    @Test
    void getLabels_devraitRetournerTousLesLabels() {
        // GIVEN
        List<Label> labels = List.of(label1, label2);
        List<LabelResponseDto> dtos = List.of(labelDto1, new LabelResponseDto());

        when(labelRepository.findAll()).thenReturn(labels);
        when(labelMapper.toDtoIterable(labels)).thenReturn(dtos);

        // WHEN
        Iterable<LabelResponseDto> resultat = labelService.getLabels();

        // THEN
        assertThat(resultat).asList().hasSize(2);
        verify(labelRepository).findAll();
    }

    // -------------------------------------------------------------------------
    // getLabelEntity
    // -------------------------------------------------------------------------

    @Test
    void getLabelEntity_devraitRetournerLEntite_siExistant() {
        // GIVEN
        when(labelRepository.findById(1L)).thenReturn(Optional.of(label1));

        // WHEN
        Label resultat = labelService.getLabelEntity(1L);

        // THEN
        assertThat(resultat.getNom()).isEqualTo("Audiovisuel");
        verify(labelRepository).findById(1L);
    }

    @Test
    void getLabelEntity_devraitLeverException_siInexistant() {
        // GIVEN
        when(labelRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> labelService.getLabelEntity(99L));
    }

    // -------------------------------------------------------------------------
    // getLabel
    // -------------------------------------------------------------------------

    @Test
    void getLabel_devraitRetournerLeDto_siExistant() {
        // GIVEN
        when(labelRepository.findById(1L)).thenReturn(Optional.of(label1));
        when(labelMapper.toDto(label1)).thenReturn(labelDto1);

        // WHEN
        LabelResponseDto resultat = labelService.getLabel(1L);

        // THEN
        assertThat(resultat.nom).isEqualTo("Audiovisuel");
        verify(labelMapper).toDto(label1);
    }

    @Test
    void getLabel_devraitLeverException_siInexistant() {
        // GIVEN
        when(labelRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> labelService.getLabel(99L));
        verify(labelMapper, never()).toDto(any());
    }

    // -------------------------------------------------------------------------
    // createLabel
    // -------------------------------------------------------------------------

    @Test
    void createLabel_devraitSauvegarderEtRetournerLeLabel() {
        // GIVEN
        when(labelMapper.toEntity(requestDto)).thenReturn(label1);
        when(labelRepository.save(label1)).thenReturn(label1);
        when(labelMapper.toDto(label1)).thenReturn(labelDto1);

        // WHEN
        LabelResponseDto resultat = labelService.createLabel(requestDto);

        // THEN
        assertThat(resultat.nom).isEqualTo("Audiovisuel");
        verify(labelRepository).save(label1);
    }

    // -------------------------------------------------------------------------
    // updateLabel
    // -------------------------------------------------------------------------

    @Test
    void updateLabel_devraitMettreAJourEtRetourner_siExistant() {
        // GIVEN
        when(labelRepository.findById(1L)).thenReturn(Optional.of(label1));
        when(labelRepository.save(label1)).thenReturn(label1);
        when(labelMapper.toDto(label1)).thenReturn(labelDto1);

        // WHEN
        LabelResponseDto resultat = labelService.updateLabel(1L, requestDto);

        // THEN
        assertThat(resultat.nom).isEqualTo("Audiovisuel");
        verify(labelMapper).updateEntity(requestDto, label1);
        verify(labelRepository).save(label1);
    }

    @Test
    void updateLabel_devraitLeverException_siIdNull() {
        // WHEN / THEN
        assertThrows(IllegalArgumentException.class,
                () -> labelService.updateLabel(null, requestDto));
        verify(labelRepository, never()).save(any());
    }

    @Test
    void updateLabel_devraitLeverException_siInexistant() {
        // GIVEN
        when(labelRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> labelService.updateLabel(99L, requestDto));
        verify(labelRepository, never()).save(any());
    }

    // -------------------------------------------------------------------------
    // deleteLabelById
    // -------------------------------------------------------------------------

    @Test
    void deleteLabel_devraitSupprimerLabel_etRetirerDesEquipements() {
        // GIVEN
        when(labelRepository.findById(1L)).thenReturn(Optional.of(label1));

        // WHEN
        labelService.deleteLabelById(1L);

        // THEN
        verify(equipementService).removeLabelFromAllEquipements(label1);
        verify(labelRepository).delete(label1);
    }

    @Test
    void deleteLabel_devraitLeverException_siInexistant() {
        // GIVEN
        when(labelRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> labelService.deleteLabelById(99L));
        verify(equipementService, never()).removeLabelFromAllEquipements(any());
        verify(labelRepository, never()).delete(any());
    }
}
