package com.smart_reservation.api.serviceTests;

import com.smart_reservation.api.dto.mapper.ListeEquipementsMapper;
import com.smart_reservation.api.dto.mapper.UtilisateurMapper;
import com.smart_reservation.api.dto.request.ListeEquipementsRequestDto;
import com.smart_reservation.api.dto.response.ListeEquipementsResponseDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.Equipement;
import com.smart_reservation.api.model.ListeEquipements;
import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.repository.EquipementRepository;
import com.smart_reservation.api.repository.ListeEquipementsRepository;
import com.smart_reservation.api.repository.UtilisateurRepository;
import com.smart_reservation.api.service.UtilisateurService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UtilisateurServiceTests {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private ListeEquipementsRepository listeEquipementsRepository;

    @Mock
    private EquipementRepository equipementRepository;

    @Mock
    private UtilisateurMapper utilisateurMapper;

    @Mock
    private ListeEquipementsMapper listeEquipementsMapper;

    @InjectMocks
    private UtilisateurService utilisateurService;

    // Données de test
    private Utilisateur utilisateur1;
    private Utilisateur utilisateur2;
    private ListeEquipements liste1;
    private ListeEquipements liste2;
    private Equipement equipement1;
    private Equipement equipement2;

    @BeforeEach
    void setUp() {

        // Equipements
        equipement1 = new Equipement();
        equipement1.setId(1L);
        equipement1.setNom("Xsens");

        equipement2 = new Equipement();
        equipement2.setId(2L);
        equipement2.setNom("Qualysis");

        // Listes d'équipements
        liste1 = new ListeEquipements();
        liste1.setId(1L);
        liste1.setNom("motion capture");
        liste1.setEquipements(List.of(equipement1, equipement2));

        liste2 = new ListeEquipements();
        liste2.setId(2L);
        liste2.setNom("Entrainements mardi soir");
        liste2.setEquipements(new ArrayList<>());

        // Utilisateur 1 — avec deux listes
        utilisateur1 = new Utilisateur();
        utilisateur1.setId(1L);
        utilisateur1.setNom("Dupont");
        utilisateur1.setPrenom("Jean");
        utilisateur1.setMail("jean.dupont@gmail.com");

        liste1.setUtilisateur(utilisateur1);
        liste2.setUtilisateur(utilisateur1);

        // Utilisateur 2 — sans liste
        utilisateur2 = new Utilisateur();
        utilisateur2.setId(2L);
        utilisateur2.setNom("Martin");
        utilisateur2.setPrenom("Sophie");
        utilisateur2.setMail("sophie.martin@gmail.com");
    }

    // --- Tests getUtilisateur ---

    @Test
    void getUtilisateur_retourneLUtilisateur_siExistant() {
        // GIVEN
        UtilisateurResponseDto dto = new UtilisateurResponseDto();
        dto.id = utilisateur1.getId();
        dto.nom = utilisateur1.getNom();

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(utilisateur1));
        when(utilisateurMapper.toDto(utilisateur1)).thenReturn(dto);

        // WHEN
        UtilisateurResponseDto resultat = utilisateurService.getUtilisateur(1L);

        // THEN
        assertThat(resultat.nom).isEqualTo("Dupont");
        verify(utilisateurRepository).findById(1L);
    }

    @Test
    void getUtilisateur_leveException_siIntrouvable() {
        // GIVEN
        when(utilisateurRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> utilisateurService.getUtilisateur(99L));
    }

    // --- Tests getListesEquipements ---

    @Test
    void getListesEquipements_retourneLesListes_siUtilisateurExistant() {
        // GIVEN
        ListeEquipementsResponseDto listeDto1 = new ListeEquipementsResponseDto();
        listeDto1.id = 1L;
        listeDto1.nom = "Ma liste mobilité";

        ListeEquipementsResponseDto listeDto2 = new ListeEquipementsResponseDto();
        listeDto2.id = 2L;
        listeDto2.nom = "Liste vide";

        when(utilisateurRepository.existsById(1L)).thenReturn(true);
        when(listeEquipementsRepository.findByUtilisateurId(1L))
                .thenReturn(List.of(liste1, liste2));
        when(listeEquipementsMapper.toDtoIterable(List.of(liste1, liste2)))
                .thenReturn(List.of(listeDto1, listeDto2));

        // WHEN
        Iterable<ListeEquipementsResponseDto> resultat =
                utilisateurService.getListesEquipements(1L);

        // THEN
        assertThat(resultat).asList().hasSize(2);
        verify(listeEquipementsRepository).findByUtilisateurId(1L);
    }

    @Test
    void getListesEquipements_leveException_siUtilisateurIntrouvable() {
        // GIVEN
        when(utilisateurRepository.existsById(99L)).thenReturn(false);

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> utilisateurService.getListesEquipements(99L));
    }

    // --- Tests createListeEquipement ---

    @Test
    void createListeEquipement_creeCorrectement_avecEquipements() {
        // GIVEN
        ListeEquipementsRequestDto requestDto = new ListeEquipementsRequestDto();
        requestDto.nom = "Nouvelle liste";
        requestDto.equipementsId = List.of(1L, 2L);

        ListeEquipementsResponseDto responseDto = new ListeEquipementsResponseDto();
        responseDto.nom = "Nouvelle liste";

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(utilisateur1));
        when(equipementRepository.findById(1L)).thenReturn(Optional.of(equipement1));
        when(equipementRepository.findById(2L)).thenReturn(Optional.of(equipement2));
        when(listeEquipementsMapper.toEntity(requestDto)).thenReturn(new ListeEquipements());
        when(listeEquipementsMapper.toDto(any())).thenReturn(responseDto);

        // WHEN
        ListeEquipementsResponseDto resultat =
                utilisateurService.createListeEquipements(1L, requestDto);

        // THEN
        assertThat(resultat.nom).isEqualTo("Nouvelle liste");
        verify(listeEquipementsRepository).save(any(ListeEquipements.class));
    }

    @Test
    void createListeEquipement_leveException_siEquipementIntrouvable() {
        // GIVEN
        ListeEquipementsRequestDto requestDto = new ListeEquipementsRequestDto();
        requestDto.nom = "Nouvelle liste";
        requestDto.equipementsId = List.of(99L);

        when(utilisateurRepository.findById(1L))
                .thenReturn(Optional.of(utilisateur1)); // ← manquait
        when(listeEquipementsMapper.toEntity(any()))
                .thenReturn(new ListeEquipements());    // ← manquait
        when(equipementRepository.findById(99L))
                .thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> utilisateurService.createListeEquipements(1L, requestDto));
    }

    // --- Tests updateListeEquipements ---

    @Test
    void updateListeEquipement_modifieCorrectement_avecEquipements() {
        // GIVEN
        ListeEquipementsRequestDto requestDto = new ListeEquipementsRequestDto();
        requestDto.nom = "Nouvelle liste";
        requestDto.equipementsId = List.of(1L, 2L);

        ListeEquipementsResponseDto responseDto = new ListeEquipementsResponseDto();
        responseDto.nom = "Nouvelle liste";

        when(listeEquipementsRepository.findById(1L)).thenReturn(Optional.of(liste1));
        when(equipementRepository.findById(1L)).thenReturn(Optional.of(equipement1));
        when(equipementRepository.findById(2L)).thenReturn(Optional.of(equipement2));
        when(listeEquipementsMapper.toDto(any())).thenReturn(responseDto);

        // WHEN
        ListeEquipementsResponseDto resultat =
                utilisateurService.updateListeEquipements(1L, requestDto);

        // THEN
        assertThat(resultat.nom).isEqualTo("Nouvelle liste");
        verify(listeEquipementsRepository).save(any(ListeEquipements.class));
    }

    @Test
    void updateListeEquipement_leveRessourceException_siEquipementIntrouvable() {

        ListeEquipementsRequestDto requestDto = new ListeEquipementsRequestDto();
        requestDto.nom = "Nouvelle liste";
        requestDto.equipementsId = List.of(99L); // ID inexistant
        when(equipementRepository.findById(99L)).thenReturn(Optional.empty());
        when(listeEquipementsRepository.findById(1L)).thenReturn(Optional.of(liste1));

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> utilisateurService.updateListeEquipements(1L, requestDto));
    }

    // --- Tests deleteListeEquipements ---

    @Test
    void deleteListeEquipements_supprimerCorrectement_siExistante() {
        // GIVEN
        when(listeEquipementsRepository.findById(1L)).thenReturn(Optional.of(liste1));

        // WHEN
        utilisateurService.deleteListeEquipements(1L);

        // THEN
        verify(listeEquipementsRepository).delete(liste1);
    }

    @Test
    void deleteListeEquipements_leveException_siIntrouvable() {
        // GIVEN
        when(listeEquipementsRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(RessourceIntrouvableException.class,
                () -> utilisateurService.deleteListeEquipements(99L));
    }


}