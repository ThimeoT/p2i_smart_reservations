package com.smart_reservation.api.serviceTests;

import com.smart_reservation.api.dto.mapper.EquipementMapper;
import com.smart_reservation.api.dto.mapper.RelationEquipementMapper;
import com.smart_reservation.api.dto.request.EquipementRequestDto;
import com.smart_reservation.api.dto.request.RelationEquipementRequestDto;
import com.smart_reservation.api.dto.response.EquipementResponseDto;
import com.smart_reservation.api.dto.response.LabelResponseDto;
import com.smart_reservation.api.dto.response.RelationEquipementResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.StatutRelationEquipement;
import com.smart_reservation.api.repository.EquipementRepository;
import com.smart_reservation.api.repository.RelationEquipementRepository;
import com.smart_reservation.api.service.EquipementService;
import com.smart_reservation.api.service.LabelService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EquipementServiceTests {

    @Mock
    private EquipementRepository equipementRepository;

    @Mock
    private RelationEquipementRepository relationEquipementRepository;

    @Mock
    private EquipementMapper equipementMapper;

    @Mock
    private RelationEquipementMapper relationEquipementMapper;

    @Mock
    private LabelService labelService;

    @InjectMocks
    private EquipementService equipementService;

    private Equipement equipement;
    private EquipementRequestDto requestDto;
    private EquipementResponseDto responseDto;
    private EquipementResumeDto resumeDto;

    @BeforeEach
    void setUp() {
        // Le modèle initialise déjà relationsEquipement à new ArrayList<>(),
        // donc pas besoin de setter ici.
        equipement = new Equipement();
        equipement.setId(1L);
        equipement.setNom("Projecteur");
        equipement.setDescription("Projecteur HD");

        requestDto = new EquipementRequestDto();
        // Liste vide = aucun appel à getEquipementsEntities (non mockable car interne à this)
        requestDto.relationsEquipement = new ArrayList<RelationEquipementRequestDto>();

        responseDto = new EquipementResponseDto();
        resumeDto = new EquipementResumeDto();
    }

    // -------------------------------------------------------------------------
    // getEquipements
    // -------------------------------------------------------------------------

    @Test
    void getEquipements_devraitRetournerTousLesEquipements() {
        List<Equipement> equipements = List.of(equipement);
        List<EquipementResumeDto> resumeDtos = List.of(resumeDto);

        when(equipementRepository.findAll()).thenReturn(equipements);
        when(equipementMapper.toResumeDtoIterable(equipements)).thenReturn(resumeDtos);

        Iterable<EquipementResumeDto> resultat = equipementService.getEquipements();

        assertThat(resultat).isEqualTo(resumeDtos);
        verify(equipementRepository).findAll();
        verify(equipementMapper).toResumeDtoIterable(equipements);
    }

    // -------------------------------------------------------------------------
    // getEquipement — nominal
    // -------------------------------------------------------------------------

    @Test
    void getEquipement_devraitRetournerLEquipement_quandIdExiste() {
        when(equipementRepository.findById(1L)).thenReturn(Optional.of(equipement));
        when(equipementMapper.toDto(equipement)).thenReturn(responseDto);

        EquipementResponseDto resultat = equipementService.getEquipement(1L);

        assertThat(resultat).isEqualTo(responseDto);
        verify(equipementRepository).findById(1L);
        verify(equipementMapper).toDto(equipement);
    }

    @Test
    void getEquipement_devraitLeverUneException_quandIdInexistant() {
        when(equipementRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(
                RessourceIntrouvableException.class,
                () -> equipementService.getEquipement(99L)
        );

        verify(equipementRepository).findById(99L);
        verify(equipementMapper, never()).toDto(any());
    }

    // -------------------------------------------------------------------------
    // getEquipement — mapping complet avec labels et relations
    // -------------------------------------------------------------------------

    @Test
    void getEquipement_devraitTransmettreLesLabelsEtRelationsDansLeDto() {
        // On vérifie ici que le service transmet fidèlement ce que le mapper produit :
        // labels, relations (avec cibles et statut), et liens ressources.
        // Le mapper lui-même est testé séparément — on ne teste pas son comportement ici.

        LabelResponseDto labelDto = new LabelResponseDto();
        labelDto.id = 10L;
        labelDto.nom = "Audiovisuel";
        labelDto.description = "Matériel audiovisuel";
        labelDto.color = "#FF5733";

        EquipementResumeDto equipementCibleResume = new EquipementResumeDto();

        RelationEquipementResponseDto relationDto = new RelationEquipementResponseDto();
        relationDto.id = 20L;
        relationDto.statutRelationEquipement = StatutRelationEquipement.REQUIS;
        relationDto.equipementSourceId = 1L;
        relationDto.commentaire = "Nécessite un câble HDMI";
        relationDto.equipementsCible = List.of(equipementCibleResume);

        EquipementResponseDto dtoComplet = new EquipementResponseDto();
        dtoComplet.id = 1L;
        dtoComplet.nom = "Projecteur";
        dtoComplet.description = "Projecteur HD";
        dtoComplet.urlImage = "https://example.com/projecteur.png";
        dtoComplet.labels = List.of(labelDto);
        dtoComplet.relationsEquipement = List.of(relationDto);
        dtoComplet.liensRessources = List.of("https://example.com/manuel.pdf");

        when(equipementRepository.findById(1L)).thenReturn(Optional.of(equipement));
        when(equipementMapper.toDto(equipement)).thenReturn(dtoComplet);

        EquipementResponseDto resultat = equipementService.getEquipement(1L);

        // Champs de base
        assertThat(resultat.id).isEqualTo(1L);
        assertThat(resultat.nom).isEqualTo("Projecteur");
        assertThat(resultat.urlImage).isEqualTo("https://example.com/projecteur.png");

        // Labels
        assertThat(resultat.labels).hasSize(1);
        LabelResponseDto labelResultat = resultat.labels.get(0);
        assertThat(labelResultat.id).isEqualTo(10L);
        assertThat(labelResultat.nom).isEqualTo("Audiovisuel");
        assertThat(labelResultat.color).isEqualTo("#FF5733");

        // Relations
        assertThat(resultat.relationsEquipement).hasSize(1);
        RelationEquipementResponseDto relationResultat = resultat.relationsEquipement.get(0);
        assertThat(relationResultat.id).isEqualTo(20L);
        assertThat(relationResultat.statutRelationEquipement).isEqualTo(StatutRelationEquipement.REQUIS);
        assertThat(relationResultat.equipementSourceId).isEqualTo(1L);
        assertThat(relationResultat.commentaire).isEqualTo("Nécessite un câble HDMI");
        assertThat(relationResultat.equipementsCible).hasSize(1);

        // Liens ressources
        assertThat(resultat.liensRessources).containsExactly("https://example.com/manuel.pdf");

        verify(equipementRepository).findById(1L);
        verify(equipementMapper).toDto(equipement);
    }

    // -------------------------------------------------------------------------
    // getEquipementEntity
    // -------------------------------------------------------------------------

    @Test
    void getEquipementEntity_devraitRetournerLEntite_quandIdExiste() {
        when(equipementRepository.findById(1L)).thenReturn(Optional.of(equipement));

        Equipement resultat = equipementService.getEquipementEntity(1L);

        assertThat(resultat).isEqualTo(equipement);
    }

    @Test
    void getEquipementEntity_devraitLeverUneException_quandIdInexistant() {
        when(equipementRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(
                RessourceIntrouvableException.class,
                () -> equipementService.getEquipementEntity(99L)
        );
    }

    // -------------------------------------------------------------------------
    // createEquipement
    // -------------------------------------------------------------------------

    @Test
    void createEquipement_devraitSauvegarderEtRetournerLEquipement() {
        when(equipementMapper.toEntity(requestDto)).thenReturn(equipement);
        when(equipementRepository.save(equipement)).thenReturn(equipement);
        when(equipementMapper.toDto(equipement)).thenReturn(responseDto);

        EquipementResponseDto resultat = equipementService.createEquipement(requestDto);

        assertThat(resultat).isEqualTo(responseDto);
        verify(equipementMapper).toEntity(requestDto);
        verify(equipementRepository).save(equipement);
        verify(equipementMapper).toDto(equipement);
    }

    @Test
    void createEquipement_devraitAppelerSave_memeAvecRelationsVides() {
        requestDto.relationsEquipement = new ArrayList<>();

        when(equipementMapper.toEntity(requestDto)).thenReturn(equipement);
        when(equipementRepository.save(equipement)).thenReturn(equipement);
        when(equipementMapper.toDto(equipement)).thenReturn(responseDto);

        equipementService.createEquipement(requestDto);

        verify(equipementRepository).save(equipement);
    }

    // -------------------------------------------------------------------------
    // updateEquipement
    // -------------------------------------------------------------------------

    @Test
    void updateEquipement_devraitMettreAJourEtRetournerLEquipement_quandIdExiste() {
        when(equipementRepository.findById(1L)).thenReturn(Optional.of(equipement));
        when(equipementRepository.save(equipement)).thenReturn(equipement);
        when(equipementMapper.toDto(equipement)).thenReturn(responseDto);

        EquipementResponseDto resultat = equipementService.updateEquipement(requestDto, 1L);

        assertThat(resultat).isEqualTo(responseDto);
        verify(equipementRepository).findById(1L);
        verify(equipementMapper).updateToEntity(requestDto, equipement);
        verify(equipementRepository).save(equipement);
    }

    @Test
    void updateEquipement_devraitLeverUneException_quandIdInexistant() {
        when(equipementRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(
                RessourceIntrouvableException.class,
                () -> equipementService.updateEquipement(requestDto, 99L)
        );

        verify(equipementRepository).findById(99L);
        verify(equipementRepository, never()).save(any());
    }

    // -------------------------------------------------------------------------
    // deleteEquipement
    // -------------------------------------------------------------------------

    @Test
    void deleteEquipement_devraitSupprimerLEquipement_quandIdExiste() {
        when(equipementRepository.existsById(1L)).thenReturn(true);

        equipementService.deleteEquipement(1L);

        verify(equipementRepository).existsById(1L);
        verify(equipementRepository).deleteById(1L);
    }

    @Test
    void deleteEquipement_devraitLeverUneException_quandIdInexistant() {
        when(equipementRepository.existsById(99L)).thenReturn(false);

        assertThrows(
                RessourceIntrouvableException.class,
                () -> equipementService.deleteEquipement(99L)
        );

        verify(equipementRepository).existsById(99L);
        verify(equipementRepository, never()).deleteById(any());
    }
}