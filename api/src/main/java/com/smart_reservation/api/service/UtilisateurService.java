package com.smart_reservation.api.service;

import com.smart_reservation.api.dto.mapper.EquipementMapper;
import com.smart_reservation.api.dto.mapper.ListeEquipementsMapper;
import com.smart_reservation.api.dto.request.InitialisationRequestDto;
import com.smart_reservation.api.dto.request.InvitationRequestDto;
import com.smart_reservation.api.dto.request.ListeEquipementsRequestDto;
import com.smart_reservation.api.dto.request.UtilisateurRequestDto;
import com.smart_reservation.api.dto.response.InvitationResponseDto;
import com.smart_reservation.api.dto.response.ListeEquipementsResponseDto;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.dto.resume.EquipementResumeDto;
import com.smart_reservation.api.exception.AccesRefuseException;
import com.smart_reservation.api.exception.RessourceDejaUtiliseeException;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.ListeEquipements;
import com.smart_reservation.api.model.StatutUtilisateur;
import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.dto.mapper.UtilisateurMapper;
import com.smart_reservation.api.repository.ListeEquipementsRepository;
import com.smart_reservation.api.repository.UtilisateurRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final ListeEquipementsRepository listeEquipementsRepository;
    private final ListeEquipementsMapper listeEquipementsMapper;

    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper utilisateurMapper;

    private final EquipementService equipementService;
    private final EquipementMapper equipementMapper;

    private final BCryptPasswordEncoder passwordEncoder;

    private Boolean existsById(final long id) {
        return utilisateurRepository.existsById(id);
    }

    // UTILISATEURS

    @Transactional
    public Utilisateur getUtilisateurEntity(Long id) {
        return utilisateurRepository.findById(id).orElseThrow(
                () -> new RessourceIntrouvableException("Utilisateur", id)
        );
    }

    public UtilisateurResponseDto getUtilisateurByMail(String mail) {
        return utilisateurMapper.toDto(utilisateurRepository.findByMail(mail)
                .orElseThrow(() -> new RessourceIntrouvableException("Utilisateur", "mail", mail)));
    }

    @Transactional(readOnly = true)
    public UtilisateurResponseDto getUtilisateur(final Long id) {

        return utilisateurMapper.toDto(getUtilisateurEntity(id));
    }

    @Transactional(readOnly = true)
    public Iterable<UtilisateurResponseDto> getUtilisateurs() {
        return utilisateurMapper.toDtoIterable(
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
        if (utilisateur.getId() == null) {
            utilisateur.setDateExpiration(LocalDate.now().plusYears(5));
        }
        return utilisateurMapper.toDto(
                utilisateurRepository.save(utilisateur));
    }

    @Transactional
    public InvitationResponseDto inviteUtilisateur(InvitationRequestDto dto) {
        if (utilisateurRepository.findByMail(dto.mail).isPresent()) {
            throw new RessourceDejaUtiliseeException("Mail", dto.mail);
        }

        String motDePasseTemporaire = UUID.randomUUID().toString().substring(0, 12);
        String role = (dto.role != null && !dto.role.isBlank()) ? dto.role : "USER";


        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setMail(dto.mail);
        utilisateur.setRole(dto.role);
        utilisateur.setMotDePasseHash(passwordEncoder.encode(motDePasseTemporaire));
        utilisateur.setStatutUtilisateur(StatutUtilisateur.INVITE);

        utilisateurRepository.save(utilisateur);

        return new InvitationResponseDto(dto.mail, motDePasseTemporaire
        );
    }

    public void initialiseUtilisateur(Long id, InitialisationRequestDto dto, Authentication authentication) {
        Utilisateur user = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RessourceIntrouvableException("Utilisateur", id));

        if (!user.getMail().equals(authentication.getName())) {
            throw new AccesRefuseException("Accès interdit");
        }

        if (user.getStatutUtilisateur() != StatutUtilisateur.INVITE) {
            throw new AccesRefuseException("Ce compte a déjà été initialisé");
        }

        // Vérifie que le nouveau est différent de l'ancien
        if (passwordEncoder.matches(dto.nouveauMotDePasse, user.getMotDePasseHash())) {
            throw new IllegalArgumentException("Le nouveau mot de passe doit être différent que celui de base");
        }

        user.setNom(dto.nom);
        user.setPrenom(dto.prenom);
        user.setFormation(dto.formation);
        user.setMotDePasseHash(passwordEncoder.encode(dto.nouveauMotDePasse));
        user.setStatutUtilisateur(StatutUtilisateur.ACTIF);

        utilisateurRepository.save(user);
    }

    @Transactional
    public UtilisateurResponseDto updateUtilisateur(Long id, UtilisateurRequestDto utilisateurRequestDto) {

        Utilisateur utilisateur = getUtilisateurEntity(id);
        utilisateurMapper.updateEntity(utilisateurRequestDto, utilisateur);
        utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toDto(utilisateur);
    }

    @Transactional
    public String reinitialiserMotDePasse(Long id) {
        Utilisateur utilisateur = getUtilisateurEntity(id);
        String motDePasseTemporaire = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        utilisateur.setMotDePasseHash(passwordEncoder.encode(motDePasseTemporaire));
        utilisateur.setStatutUtilisateur(StatutUtilisateur.INVITE);
        utilisateurRepository.save(utilisateur);
        return motDePasseTemporaire;
    }

    @Transactional
    public UtilisateurResponseDto updateDateExpiration(Long id, LocalDate dateExpiration) {
        Utilisateur utilisateur = getUtilisateurEntity(id);
        utilisateur.setDateExpiration(dateExpiration);
        utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toDto(utilisateur);
    }

    //LISTES EQUIPEMENTS

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

        ListeEquipements liste = listeEquipementsRepository.findById(idListe)
                .orElseThrow(() -> new RessourceIntrouvableException("Liste d'équipements", idListe));
        listeEquipementsRepository.delete(liste);
    }

    @Transactional(readOnly = true)
    public ListeEquipementsResponseDto getListeEquipements(Long idListe, Long idUtilisateur) {

        ListeEquipements liste = listeEquipementsRepository.findById(idListe)
                .orElseThrow(() -> new RessourceIntrouvableException("Liste d'équipements", idListe));
        if (!liste.getUtilisateur().getId().equals(idUtilisateur)) {
            throw new AccesRefuseException("Vous n'avez pas le droit d'accéder à la liste d'un autre utilisateur");
        }
        return listeEquipementsMapper.toDto(liste);
    }

    @Transactional
    public ListeEquipementsResponseDto updateListeEquipements(Long idUtilisateur, Long idListe, ListeEquipementsRequestDto
            listeEquipementsDto) {

        ListeEquipements liste = listeEquipementsRepository.findById(idListe)
                .orElseThrow(() -> new RessourceIntrouvableException("Liste d'équipements", idListe));
        verifierProprietaire(liste, idUtilisateur);
        listeEquipementsMapper.updateEntity(listeEquipementsDto, liste);
        liste.setEquipements(equipementService.getEquipementsEntities(listeEquipementsDto.equipementsId));
        listeEquipementsRepository.save(liste);

        return listeEquipementsMapper.toDto(liste);
    }

    @Transactional
    public ListeEquipementsResponseDto createListeEquipements(Long utilisateurId, ListeEquipementsRequestDto
            listeEquipementsDto) {

        Utilisateur utilisateur = getUtilisateurEntity(utilisateurId);
        ListeEquipements liste = listeEquipementsMapper.toEntity(listeEquipementsDto);
        liste.setUtilisateur(utilisateur);
        liste.setEquipements(equipementService.getEquipementsEntities(listeEquipementsDto.equipementsId));
        listeEquipementsRepository.save(liste);

        return listeEquipementsMapper.toDto(liste);
    }

    private void verifierProprietaire(ListeEquipements liste, Long idUtilisateur) {
        if (!liste.getUtilisateur().getId().equals(idUtilisateur)) {
            throw new AccesRefuseException("Vous n'avez pas le droit d'accéder à la liste d'un autre utilisateur");
        }
    }

    // EQUIPEMENTS FAVORIS

    @Transactional
    public Iterable<EquipementResumeDto> getEquipementsFavoris(Long utilisateurId) {
        Utilisateur utilisateur = getUtilisateurEntity(utilisateurId);
        return equipementMapper.toResumeDtoIterable(utilisateur.getEquipementsFavoris());
    }

    public Iterable<EquipementResumeDto> addEquipementFavori(Long utilisateurId, Long idEquipement) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new
                RessourceIntrouvableException("Utilisateur", utilisateurId));
        utilisateur.addEquipementFavori(equipementService.getEquipementEntity(idEquipement));
        return equipementMapper.toResumeDtoIterable(utilisateur.getEquipementsFavoris());
    }

    public Iterable<EquipementResumeDto> removeEquipementFavori(Long utilisateurId, Long idEquipement) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new
                RessourceIntrouvableException("Utilisateur", utilisateurId));
        utilisateur.removeEquipementFavori(equipementService.getEquipementEntity(idEquipement));
        return equipementMapper.toResumeDtoIterable(utilisateur.getEquipementsFavoris());
    }


}