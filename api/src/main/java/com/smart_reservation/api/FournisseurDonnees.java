package com.smart_reservation.api;

import com.smart_reservation.api.model.*;
import com.smart_reservation.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class FournisseurDonnees implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final EquipementRepository equipementRepository;
    private final ExemplaireRepository exemplaireRepository;
    private final LabelRepository labelRepository;
    private final ReservationRepository reservationRepository;
    private final ListeEquipementsRepository listeEquipementsRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== SMART RESERVATIONS | BACK-END ===");

        if (utilisateurRepository.count() > 0) return;

        // =====================
        // UTILISATEURS
        // =====================

        // Admin — ACTIF
        Utilisateur administrateur = new Utilisateur();
        administrateur.setMail("admin@test.com");
        administrateur.setMotDePasseHash(passwordEncoder.encode("admin"));
        administrateur.setRole("ADMIN");
        administrateur.setNom("Dupont");
        administrateur.setPrenom("Alice");
        administrateur.setFormation("Master Informatique");
        administrateur.setDateExpiration(LocalDate.now().plusYears(5));
        administrateur.setStatutUtilisateur(StatutUtilisateur.ACTIF);
        utilisateurRepository.save(administrateur);

        // User actif — ACTIF
        Utilisateur premierUtilisateur = new Utilisateur();
        premierUtilisateur.setMail("user@test.com");
        premierUtilisateur.setNom("Martin");
        premierUtilisateur.setPrenom("Bob");
        premierUtilisateur.setMotDePasseHash(passwordEncoder.encode("user"));
        premierUtilisateur.setRole("USER");
        premierUtilisateur.setFormation("Master Sciences du Sport");
        premierUtilisateur.setDateExpiration(LocalDate.now().plusYears(2));
        premierUtilisateur.setStatutUtilisateur(StatutUtilisateur.ACTIF);
        utilisateurRepository.save(premierUtilisateur);

        // User actif — ACTIF
        Utilisateur deuxiemeUtilisateur = new Utilisateur();
        deuxiemeUtilisateur.setMail("claire@test.com");
        deuxiemeUtilisateur.setNom("Bernard");
        deuxiemeUtilisateur.setPrenom("Claire");
        deuxiemeUtilisateur.setMotDePasseHash(passwordEncoder.encode("claire"));
        deuxiemeUtilisateur.setRole("USER");
        deuxiemeUtilisateur.setFormation("Master Biomécanique");
        deuxiemeUtilisateur.setDateExpiration(LocalDate.now().plusMonths(6));
        deuxiemeUtilisateur.setStatutUtilisateur(StatutUtilisateur.ACTIF);
        utilisateurRepository.save(deuxiemeUtilisateur);

        // User expiré — date dans le passé → EXPIRE
        Utilisateur troisiemeUtilisateur = new Utilisateur();
        troisiemeUtilisateur.setMail("david@test.com");
        troisiemeUtilisateur.setNom("Petit");
        troisiemeUtilisateur.setPrenom("David");
        troisiemeUtilisateur.setMotDePasseHash(passwordEncoder.encode("david"));
        troisiemeUtilisateur.setRole("USER");
        troisiemeUtilisateur.setFormation("Licence STAPS");
        troisiemeUtilisateur.setDateExpiration(LocalDate.now().minusMonths(1));
        troisiemeUtilisateur.setStatutUtilisateur(StatutUtilisateur.EXPIRE);
        utilisateurRepository.save(troisiemeUtilisateur);

        // User actif — ACTIF
        Utilisateur quatriemeUtilisateur = new Utilisateur();
        quatriemeUtilisateur.setMail("emma@test.com");
        quatriemeUtilisateur.setNom("Leclerc");
        quatriemeUtilisateur.setPrenom("Emma");
        quatriemeUtilisateur.setMotDePasseHash(passwordEncoder.encode("emma"));
        quatriemeUtilisateur.setRole("USER");
        quatriemeUtilisateur.setFormation("Master Neurosciences");
        quatriemeUtilisateur.setDateExpiration(LocalDate.now().plusYears(1));
        quatriemeUtilisateur.setStatutUtilisateur(StatutUtilisateur.ACTIF);
        utilisateurRepository.save(quatriemeUtilisateur);

        // User invité — pour tester le flux d'initialisation
        Utilisateur utilisateurInvite = new Utilisateur();
        utilisateurInvite.setMail("invite@test.com");
        utilisateurInvite.setMotDePasseHash(passwordEncoder.encode("invite123"));
        utilisateurInvite.setRole("USER");
        utilisateurInvite.setStatutUtilisateur(StatutUtilisateur.INVITE);
        utilisateurRepository.save(utilisateurInvite);

        // =====================
        // LABELS
        // =====================

        Label labelCapteur = new Label();
        labelCapteur.setNom("Capteur");
        labelCapteur.setDescription("Capteurs et systèmes d'acquisition de données");
        labelCapteur.setColor("#3B82F6");
        labelRepository.save(labelCapteur);

        Label labelRealiteVirtuelle = new Label();
        labelRealiteVirtuelle.setNom("Réalité Virtuelle");
        labelRealiteVirtuelle.setDescription("Casques et équipements de réalité virtuelle et augmentée");
        labelRealiteVirtuelle.setColor("#8B5CF6");
        labelRepository.save(labelRealiteVirtuelle);

        Label labelVideo = new Label();
        labelVideo.setNom("Vidéo");
        labelVideo.setDescription("Caméras et équipements vidéo");
        labelVideo.setColor("#EF4444");
        labelRepository.save(labelVideo);

        Label labelForce = new Label();
        labelForce.setNom("Force");
        labelForce.setDescription("Mesure de force et puissance");
        labelForce.setColor("#F59E0B");
        labelRepository.save(labelForce);

        Label labelElectromyographie = new Label();
        labelElectromyographie.setNom("Électromyographie");
        labelElectromyographie.setDescription("Mesure de l'activité musculaire");
        labelElectromyographie.setColor("#10B981");
        labelRepository.save(labelElectromyographie);

        Label labelOptique = new Label();
        labelOptique.setNom("Optique");
        labelOptique.setDescription("Systèmes de capture de mouvement optique");
        labelOptique.setColor("#6366F1");
        labelRepository.save(labelOptique);

        Label labelAccessoire = new Label();
        labelAccessoire.setNom("Accessoire");
        labelAccessoire.setDescription("Accessoires et supports");
        labelAccessoire.setColor("#6B7280");
        labelRepository.save(labelAccessoire);

        Label labelPerformance = new Label();
        labelPerformance.setNom("Performance");
        labelPerformance.setDescription("Mesure de la performance sportive");
        labelPerformance.setColor("#F97316");
        labelRepository.save(labelPerformance);

        // =====================
        // EQUIPEMENTS + EXEMPLAIRES
        // =====================

        // --- 1080 Sprint ---
        Equipement milleCentQuatreVingtSprint = new Equipement();
        milleCentQuatreVingtSprint.setNom("1080 Sprint");
        milleCentQuatreVingtSprint.setDescription("Système de résistance et d'assistance motorisé pour l'entraînement sportif. Mesure la force, la vitesse et la puissance en temps réel.");
        milleCentQuatreVingtSprint.addLabel(labelForce);
        milleCentQuatreVingtSprint.addLabel(labelPerformance);
        milleCentQuatreVingtSprint.addLienRessource("https://www.1080motion.com/products/1080-sprint");
        equipementRepository.save(milleCentQuatreVingtSprint);

        Exemplaire exemplaireMilleCentQuatreVingtSprintUn = new Exemplaire();
        exemplaireMilleCentQuatreVingtSprintUn.setNomSerie("1080-SPRINT-001");
        exemplaireMilleCentQuatreVingtSprintUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        milleCentQuatreVingtSprint.addExemplaire(exemplaireMilleCentQuatreVingtSprintUn);
        equipementRepository.save(milleCentQuatreVingtSprint);
        exemplaireRepository.save(exemplaireMilleCentQuatreVingtSprintUn);

        // --- 1080 Quantum ---
        Equipement milleCentQuatreVingtQuantum = new Equipement();
        milleCentQuatreVingtQuantum.setNom("1080 Quantum");
        milleCentQuatreVingtQuantum.setDescription("Système de résistance motorisé multi-directionnel pour l'analyse biomécanique et l'entraînement fonctionnel.");
        milleCentQuatreVingtQuantum.addLabel(labelForce);
        milleCentQuatreVingtQuantum.addLabel(labelPerformance);
        milleCentQuatreVingtQuantum.addLienRessource("https://www.1080motion.com/products/1080-quantum");
        equipementRepository.save(milleCentQuatreVingtQuantum);

        Exemplaire exemplaireMilleCentQuatreVingtQuantumUn = new Exemplaire();
        exemplaireMilleCentQuatreVingtQuantumUn.setNomSerie("1080-QUANTUM-001");
        exemplaireMilleCentQuatreVingtQuantumUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        milleCentQuatreVingtQuantum.addExemplaire(exemplaireMilleCentQuatreVingtQuantumUn);
        equipementRepository.save(milleCentQuatreVingtQuantum);
        exemplaireRepository.save(exemplaireMilleCentQuatreVingtQuantumUn);

        // --- Ceinture renforcée 1080 ---
        Equipement ceintureRenforcee = new Equipement();
        ceintureRenforcee.setNom("Ceinture renforcée 1080");
        ceintureRenforcee.setDescription("Ceinture de fixation renforcée compatible avec les systèmes 1080 Sprint et 1080 Quantum.");
        ceintureRenforcee.addLabel(labelAccessoire);
        ceintureRenforcee.addLabel(labelPerformance);
        equipementRepository.save(ceintureRenforcee);

        Exemplaire exemplaireCeintureRenforceeUn = new Exemplaire();
        exemplaireCeintureRenforceeUn.setNomSerie("CEINTURE-1080-001");
        exemplaireCeintureRenforceeUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        ceintureRenforcee.addExemplaire(exemplaireCeintureRenforceeUn);
        exemplaireRepository.save(exemplaireCeintureRenforceeUn);

        Exemplaire exemplaireCeintureRenforceeDeux = new Exemplaire();
        exemplaireCeintureRenforceeDeux.setNomSerie("CEINTURE-1080-002");
        exemplaireCeintureRenforceeDeux.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        ceintureRenforcee.addExemplaire(exemplaireCeintureRenforceeDeux);
        exemplaireRepository.save(exemplaireCeintureRenforceeDeux);


        // --- Delsys Trigger Module ---
        Equipement delsysTriggerModule = new Equipement();
        delsysTriggerModule.setNom("Delsys Trigger Module");
        delsysTriggerModule.setDescription("Module de synchronisation pour les systèmes Delsys. Permet la synchronisation avec des équipements externes.");
        delsysTriggerModule.addLabel(labelElectromyographie);
        delsysTriggerModule.addLabel(labelCapteur);
        delsysTriggerModule.addLienRessource("https://www.delsys.com");
        equipementRepository.save(delsysTriggerModule);

        Exemplaire exemplaireDelsysTriggerModuleUn = new Exemplaire();
        exemplaireDelsysTriggerModuleUn.setNomSerie("DELSYS-TRIGGER-001");
        exemplaireDelsysTriggerModuleUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        delsysTriggerModule.addExemplaire(exemplaireDelsysTriggerModuleUn);
        equipementRepository.save(delsysTriggerModule);
        exemplaireRepository.save(exemplaireCeintureRenforceeDeux);

        // --- Kit EMG Sensor ---
        Equipement kitEmgSensor = new Equipement();
        kitEmgSensor.setNom("Kit EMG Sensor");
        kitEmgSensor.setDescription("Kit complet de capteurs EMG pour la mesure de l'activité musculaire. Inclut électrodes et câbles.");
        kitEmgSensor.addLabel(labelElectromyographie);
        kitEmgSensor.addLabel(labelCapteur);
        kitEmgSensor.addLienRessource("https://www.delsys.com");
        equipementRepository.save(kitEmgSensor);

        Exemplaire exemplaireKitEmgSensorUn = new Exemplaire();
        exemplaireKitEmgSensorUn.setNomSerie("KIT-EMG-001");
        exemplaireKitEmgSensorUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        kitEmgSensor.addExemplaire(exemplaireKitEmgSensorUn);

        Exemplaire exemplaireKitEmgSensorDeux = new Exemplaire();
        exemplaireKitEmgSensorDeux.setNomSerie("KIT-EMG-002");
        exemplaireKitEmgSensorDeux.setStatutDisponibilite(StatutDisponibilite.EMPRUNTE);
        kitEmgSensor.addExemplaire(exemplaireKitEmgSensorDeux);
        equipementRepository.save(kitEmgSensor);
        exemplaireRepository.save(exemplaireKitEmgSensorUn);
        exemplaireRepository.save(exemplaireKitEmgSensorDeux);

        // --- K-Push ---
        Equipement kPush = new Equipement();
        kPush.setNom("K-Push");
        kPush.setDescription("Dynamomètre portable pour la mesure de la force en poussée.");
        kPush.addLabel(labelForce);
        kPush.addLabel(labelPerformance);
        equipementRepository.save(kPush);

        Exemplaire exemplaireKPushUn = new Exemplaire();
        exemplaireKPushUn.setNomSerie("K-PUSH-001");
        exemplaireKPushUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        kPush.addExemplaire(exemplaireKPushUn);
        equipementRepository.save(kPush);
        exemplaireRepository.save(exemplaireKPushUn);

        // --- K-Power ---
        Equipement kPower = new Equipement();
        kPower.setNom("K-Power");
        kPower.setDescription("Système de mesure de la puissance musculaire en temps réel.");
        kPower.addLabel(labelForce);
        kPower.addLabel(labelPerformance);
        equipementRepository.save(kPower);

        Exemplaire exemplaireKPowerUn = new Exemplaire();
        exemplaireKPowerUn.setNomSerie("K-POWER-001");
        exemplaireKPowerUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        kPower.addExemplaire(exemplaireKPowerUn);
        equipementRepository.save(kPower);
        exemplaireRepository.save(exemplaireKPowerUn);

        // --- K-Pull ---
        Equipement kPull = new Equipement();
        kPull.setNom("K-Pull");
        kPull.setDescription("Dynamomètre portable pour la mesure de la force en traction.");
        kPull.addLabel(labelForce);
        kPull.addLabel(labelPerformance);
        equipementRepository.save(kPull);

        Exemplaire exemplaireKPullUn = new Exemplaire();
        exemplaireKPullUn.setNomSerie("K-PULL-001");
        exemplaireKPullUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        kPull.addExemplaire(exemplaireKPullUn);
        equipementRepository.save(kPull);
        exemplaireRepository.save(exemplaireKPullUn);

        // --- Kit Plateforme de Force ---
        Equipement kitPlateformeDeForce = new Equipement();
        kitPlateformeDeForce.setNom("Kit Plateforme de Force");
        kitPlateformeDeForce.setDescription("Plateforme de mesure des forces de réaction au sol. Utilisée pour l'analyse de la marche, du saut et de l'équilibre.");
        kitPlateformeDeForce.addLabel(labelForce);
        kitPlateformeDeForce.addLabel(labelCapteur);
        equipementRepository.save(kitPlateformeDeForce);

        Exemplaire exemplaireKitPlateformeDeForceUn = new Exemplaire();
        exemplaireKitPlateformeDeForceUn.setNomSerie("PLATEFORME-FORCE-001");
        exemplaireKitPlateformeDeForceUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        kitPlateformeDeForce.addExemplaire(exemplaireKitPlateformeDeForceUn);

        Exemplaire exemplaireKitPlateformeDeForceDeux = new Exemplaire();
        exemplaireKitPlateformeDeForceDeux.setNomSerie("PLATEFORME-FORCE-002");
        exemplaireKitPlateformeDeForceDeux.setStatutDisponibilite(StatutDisponibilite.MAINTENANCE);
        kitPlateformeDeForce.addExemplaire(exemplaireKitPlateformeDeForceDeux);
        equipementRepository.save(kitPlateformeDeForce);
        exemplaireRepository.save(exemplaireKitPlateformeDeForceUn);
        exemplaireRepository.save(exemplaireKitPlateformeDeForceDeux);

        // --- Meta Quest ---
        Equipement metaQuest = new Equipement();
        metaQuest.setNom("Meta Quest");
        metaQuest.setDescription("Casque de réalité virtuelle autonome pour les applications de recherche et de réhabilitation.");
        metaQuest.addLabel(labelRealiteVirtuelle);
        metaQuest.addLienRessource("https://www.meta.com/quest");
        equipementRepository.save(metaQuest);

        Exemplaire exemplaireMetaQuestUn = new Exemplaire();
        exemplaireMetaQuestUn.setNomSerie("META-QUEST-001");
        exemplaireMetaQuestUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        metaQuest.addExemplaire(exemplaireMetaQuestUn);

        Exemplaire exemplaireMetaQuestDeux = new Exemplaire();
        exemplaireMetaQuestDeux.setNomSerie("META-QUEST-002");
        exemplaireMetaQuestDeux.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        metaQuest.addExemplaire(exemplaireMetaQuestDeux);

        Exemplaire exemplaireMetaQuestTrois = new Exemplaire();
        exemplaireMetaQuestTrois.setNomSerie("META-QUEST-003");
        exemplaireMetaQuestTrois.setStatutDisponibilite(StatutDisponibilite.EMPRUNTE);
        metaQuest.addExemplaire(exemplaireMetaQuestTrois);
        equipementRepository.save(metaQuest);
        exemplaireRepository.save(exemplaireMetaQuestUn);
        exemplaireRepository.save(exemplaireMetaQuestDeux);
        exemplaireRepository.save(exemplaireMetaQuestTrois);

        // --- OPTOJUMP ---
        Equipement optojump = new Equipement();
        optojump.setNom("OPTOJUMP");
        optojump.setDescription("Système de mesure optique pour l'analyse du saut et de la marche. Mesure les temps de contact et de vol.");
        optojump.addLabel(labelOptique);
        optojump.addLabel(labelPerformance);
        optojump.addLienRessource("https://www.microgate.it/products/optojump-next");
        equipementRepository.save(optojump);

        Exemplaire exemplaireOptojumpUn = new Exemplaire();
        exemplaireOptojumpUn.setNomSerie("OPTOJUMP-001");
        exemplaireOptojumpUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        optojump.addExemplaire(exemplaireOptojumpUn);
        equipementRepository.save(optojump);
        exemplaireRepository.save(exemplaireOptojumpUn);

        // --- Hololens 2 ---
        Equipement hololensDeux = new Equipement();
        hololensDeux.setNom("Hololens 2");
        hololensDeux.setDescription("Casque de réalité mixte Microsoft pour les applications de chirurgie assistée et de formation.");
        hololensDeux.addLabel(labelRealiteVirtuelle);
        hololensDeux.addLienRessource("https://www.microsoft.com/hololens");
        equipementRepository.save(hololensDeux);

        Exemplaire exemplaireHololensDeuxUn = new Exemplaire();
        exemplaireHololensDeuxUn.setNomSerie("HOLOLENS-2-001");
        exemplaireHololensDeuxUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        hololensDeux.addExemplaire(exemplaireHololensDeuxUn);
        equipementRepository.save(hololensDeux);
        exemplaireRepository.save(exemplaireHololensDeuxUn);
        // --- Metamax ---
        Equipement metamax = new Equipement();
        metamax.setNom("Metamax");
        metamax.setDescription("Analyseur de gaz portable pour la mesure de la consommation d'oxygène et des échanges gazeux.");
        metamax.addLabel(labelCapteur);
        metamax.addLabel(labelPerformance);
        equipementRepository.save(metamax);

        Exemplaire exemplaireMetamaxUn = new Exemplaire();
        exemplaireMetamaxUn.setNomSerie("METAMAX-001");
        exemplaireMetamaxUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        metamax.addExemplaire(exemplaireMetamaxUn);
        equipementRepository.save(metamax);
        exemplaireRepository.save(exemplaireMetamaxUn);

        // --- Fond Vert ---
        Equipement fondVert = new Equipement();
        fondVert.setNom("Fond Vert");
        fondVert.setDescription("Fond vert pour incrustation vidéo en studio.");
        fondVert.addLabel(labelVideo);
        fondVert.addLabel(labelAccessoire);
        equipementRepository.save(fondVert);

        Exemplaire exemplaireFondVertUn = new Exemplaire();
        exemplaireFondVertUn.setNomSerie("FOND-VERT-001");
        exemplaireFondVertUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        fondVert.addExemplaire(exemplaireFondVertUn);
        equipementRepository.save(fondVert);
        exemplaireRepository.save(exemplaireFondVertUn);

        // --- Trépied Fond Vert ---
        Equipement trepiedFondVert = new Equipement();
        trepiedFondVert.setNom("Trépied Fond Vert");
        trepiedFondVert.setDescription("Trépied de support pour fond vert, réglable en hauteur.");
        trepiedFondVert.addLabel(labelAccessoire);
        trepiedFondVert.addLabel(labelVideo);
        equipementRepository.save(trepiedFondVert);

        Exemplaire exemplaireTrepiedFondVertUn = new Exemplaire();
        exemplaireTrepiedFondVertUn.setNomSerie("TREPIED-FOND-VERT-001");
        exemplaireTrepiedFondVertUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        trepiedFondVert.addExemplaire(exemplaireTrepiedFondVertUn);

        Exemplaire exemplaireTrepiedFondVertDeux = new Exemplaire();
        exemplaireTrepiedFondVertDeux.setNomSerie("TREPIED-FOND-VERT-002");
        exemplaireTrepiedFondVertDeux.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        trepiedFondVert.addExemplaire(exemplaireTrepiedFondVertDeux);
        equipementRepository.save(trepiedFondVert);
        exemplaireRepository.save(exemplaireTrepiedFondVertUn);
        exemplaireRepository.save(exemplaireTrepiedFondVertDeux);


        // --- Caméra sur Trépied ---
        Equipement cameraSurTrepied = new Equipement();
        cameraSurTrepied.setNom("Caméra sur Trépied");
        cameraSurTrepied.setDescription("Caméra vidéo haute définition montée sur trépied, pour l'enregistrement de séances et l'analyse du mouvement.");
        cameraSurTrepied.addLabel(labelVideo);
        equipementRepository.save(cameraSurTrepied);

        Exemplaire exemplaireCameraSurTrepiedUn = new Exemplaire();
        exemplaireCameraSurTrepiedUn.setNomSerie("CAMERA-TREPIED-001");
        exemplaireCameraSurTrepiedUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        cameraSurTrepied.addExemplaire(exemplaireCameraSurTrepiedUn);

        Exemplaire exemplaireCameraSurTrepiedDeux = new Exemplaire();
        exemplaireCameraSurTrepiedDeux.setNomSerie("CAMERA-TREPIED-002");
        exemplaireCameraSurTrepiedDeux.setStatutDisponibilite(StatutDisponibilite.EMPRUNTE);
        cameraSurTrepied.addExemplaire(exemplaireCameraSurTrepiedDeux);
        equipementRepository.save(cameraSurTrepied);
        exemplaireRepository.save(exemplaireCameraSurTrepiedUn);
        exemplaireRepository.save(exemplaireCameraSurTrepiedDeux);

        // --- Camera Sync Unit ---
        Equipement cameraSyncUnit = new Equipement();
        cameraSyncUnit.setNom("Camera Sync Unit");
        cameraSyncUnit.setDescription("Unité de synchronisation pour caméras multiples. Permet la capture synchronisée depuis plusieurs angles.");
        cameraSyncUnit.addLabel(labelVideo);
        cameraSyncUnit.addLabel(labelCapteur);
        equipementRepository.save(cameraSyncUnit);

        Exemplaire exemplaireCameraSyncUnitUn = new Exemplaire();
        exemplaireCameraSyncUnitUn.setNomSerie("CAMERA-SYNC-001");
        exemplaireCameraSyncUnitUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        cameraSyncUnit.addExemplaire(exemplaireCameraSyncUnitUn);
        equipementRepository.save(cameraSyncUnit);
        exemplaireRepository.save(exemplaireCameraSyncUnitUn);

        // --- Razer ---
        Equipement razer = new Equipement();
        razer.setNom("Razer");
        razer.setDescription("Ordinateur portable Razer haute performance pour le traitement de données et la visualisation en temps réel.");
        razer.addLabel(labelAccessoire);
        equipementRepository.save(razer);

        Exemplaire exemplaireRazerUn = new Exemplaire();
        exemplaireRazerUn.setNomSerie("RAZER-001");
        exemplaireRazerUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        razer.addExemplaire(exemplaireRazerUn);
        equipementRepository.save(razer);
        exemplaireRepository.save(exemplaireRazerUn);

        // --- TOBII Pro Glasses ---
        Equipement tobiiProGlasses = new Equipement();
        tobiiProGlasses.setNom("TOBII Pro Glasses");
        tobiiProGlasses.setDescription("Lunettes de suivi du regard (eye-tracking) pour l'analyse de l'attention visuelle en situation réelle.");
        tobiiProGlasses.addLabel(labelCapteur);
        tobiiProGlasses.addLabel(labelOptique);
        tobiiProGlasses.addLienRessource("https://www.tobii.com/products/eye-trackers/wearables");
        equipementRepository.save(tobiiProGlasses);

        Exemplaire exemplaireTobiiProGlassesUn = new Exemplaire();
        exemplaireTobiiProGlassesUn.setNomSerie("TOBII-GLASSES-001");
        exemplaireTobiiProGlassesUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        tobiiProGlasses.addExemplaire(exemplaireTobiiProGlassesUn);
        equipementRepository.save(tobiiProGlasses);
        exemplaireRepository.save(exemplaireTobiiProGlassesUn);

        // --- Kit de Synchronisation QTM ---
        Equipement kitSynchronisationQtm = new Equipement();
        kitSynchronisationQtm.setNom("Kit de Synchronisation QTM");
        kitSynchronisationQtm.setDescription("Kit de synchronisation compatible avec Qualisys Track Manager. Permet la synchronisation de multiples systèmes de capture.");
        kitSynchronisationQtm.addLabel(labelCapteur);
        kitSynchronisationQtm.addLabel(labelOptique);
        kitSynchronisationQtm.addLienRessource("https://www.qualisys.com");
        equipementRepository.save(kitSynchronisationQtm);

        Exemplaire exemplaireKitSynchronisationQtmUn = new Exemplaire();
        exemplaireKitSynchronisationQtmUn.setNomSerie("KIT-SYNC-QTM-001");
        exemplaireKitSynchronisationQtmUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        kitSynchronisationQtm.addExemplaire(exemplaireKitSynchronisationQtmUn);
        equipementRepository.save(kitSynchronisationQtm);
        exemplaireRepository.save(exemplaireKitSynchronisationQtmUn);

        // --- Tracker ---
        Equipement tracker = new Equipement();
        tracker.setNom("Tracker");
        tracker.setDescription("Capteur de tracking inertiel pour la capture de mouvement sans marqueurs.");
        tracker.addLabel(labelCapteur);
        tracker.addLabel(labelOptique);
        equipementRepository.save(tracker);

        Exemplaire exemplaireTrackerUn = new Exemplaire();
        exemplaireTrackerUn.setNomSerie("TRACKER-001");
        exemplaireTrackerUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        tracker.addExemplaire(exemplaireTrackerUn);

        Exemplaire exemplaireTrackerDeux = new Exemplaire();
        exemplaireTrackerDeux.setNomSerie("TRACKER-002");
        exemplaireTrackerDeux.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        tracker.addExemplaire(exemplaireTrackerDeux);

        Exemplaire exemplaireTrackerTrois = new Exemplaire();
        exemplaireTrackerTrois.setNomSerie("TRACKER-003");
        exemplaireTrackerTrois.setStatutDisponibilite(StatutDisponibilite.HORS_SERVICE);
        tracker.addExemplaire(exemplaireTrackerTrois);
        equipementRepository.save(tracker);
        exemplaireRepository.save(exemplaireTrackerUn);
        exemplaireRepository.save(exemplaireTrackerDeux);
        exemplaireRepository.save(exemplaireTrackerTrois);

        // --- Chronomètre ---
        Equipement chronometre = new Equipement();
        chronometre.setNom("Chronomètre");
        chronometre.setDescription("Chronomètre de précision pour la mesure des temps de performance.");
        chronometre.addLabel(labelPerformance);
        equipementRepository.save(chronometre);

        Exemplaire exemplaireChronometreUn = new Exemplaire();
        exemplaireChronometreUn.setNomSerie("CHRONO-001");
        exemplaireChronometreUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        chronometre.addExemplaire(exemplaireChronometreUn);

        Exemplaire exemplaireChronometreDeux = new Exemplaire();
        exemplaireChronometreDeux.setNomSerie("CHRONO-002");
        exemplaireChronometreDeux.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        chronometre.addExemplaire(exemplaireChronometreDeux);
        equipementRepository.save(chronometre);
        exemplaireRepository.save(exemplaireChronometreUn);
        exemplaireRepository.save(exemplaireChronometreDeux);

        // --- Porte Émetteur Réflecteur ---
        Equipement porteEmetteurReflecteur = new Equipement();
        porteEmetteurReflecteur.setNom("Porte (Émetteur + Réflecteur)");
        porteEmetteurReflecteur.setDescription("Système de porte optique composé d'un émetteur et d'un réflecteur pour la détection de passage et la mesure de vitesse.");
        porteEmetteurReflecteur.addLabel(labelOptique);
        porteEmetteurReflecteur.addLabel(labelPerformance);
        equipementRepository.save(porteEmetteurReflecteur);

        Exemplaire exemplairePorteEmetteurReflecteurUn = new Exemplaire();
        exemplairePorteEmetteurReflecteurUn.setNomSerie("PORTE-OPT-001");
        exemplairePorteEmetteurReflecteurUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        porteEmetteurReflecteur.addExemplaire(exemplairePorteEmetteurReflecteurUn);

        Exemplaire exemplairePorteEmetteurReflecteurDeux = new Exemplaire();
        exemplairePorteEmetteurReflecteurDeux.setNomSerie("PORTE-OPT-002");
        exemplairePorteEmetteurReflecteurDeux.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        porteEmetteurReflecteur.addExemplaire(exemplairePorteEmetteurReflecteurDeux);
        equipementRepository.save(porteEmetteurReflecteur);
        exemplaireRepository.save(exemplairePorteEmetteurReflecteurUn);
        exemplaireRepository.save(exemplairePorteEmetteurReflecteurDeux);

        // --- Trépied ---
        Equipement trepied = new Equipement();
        trepied.setNom("Trépied");
        trepied.setDescription("Trépied polyvalent pour caméras et équipements optiques.");
        trepied.addLabel(labelAccessoire);
        equipementRepository.save(trepied);

        Exemplaire exemplaireTrepiedUn = new Exemplaire();
        exemplaireTrepiedUn.setNomSerie("TREPIED-001");
        exemplaireTrepiedUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        trepied.addExemplaire(exemplaireTrepiedUn);

        Exemplaire exemplaireTrepiedDeux = new Exemplaire();
        exemplaireTrepiedDeux.setNomSerie("TREPIED-002");
        exemplaireTrepiedDeux.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        trepied.addExemplaire(exemplaireTrepiedDeux);

        Exemplaire exemplaireTrepiedTrois = new Exemplaire();
        exemplaireTrepiedTrois.setNomSerie("TREPIED-003");
        exemplaireTrepiedTrois.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        trepied.addExemplaire(exemplaireTrepiedTrois);
        equipementRepository.save(trepied);
        exemplaireRepository.save(exemplaireTrepiedUn);
        exemplaireRepository.save(exemplaireTrepiedDeux);
        exemplaireRepository.save(exemplaireTrepiedTrois);

        // --- SEM ---
        Equipement sem = new Equipement();
        sem.setNom("SEM");
        sem.setDescription("Système d'électrostimulation musculaire pour la rééducation et le renforcement musculaire.");
        sem.addLabel(labelElectromyographie);
        sem.addLabel(labelCapteur);
        equipementRepository.save(sem);

        Exemplaire exemplaireSemUn = new Exemplaire();
        exemplaireSemUn.setNomSerie("SEM-001");
        exemplaireSemUn.setStatutDisponibilite(StatutDisponibilite.DISPONIBLE);
        sem.addExemplaire(exemplaireSemUn);
        equipementRepository.save(sem);
        exemplaireRepository.save(exemplaireSemUn);

        // =====================
        // RELATIONS EQUIPEMENTS
        // =====================

        RelationEquipement relationSprintCeinture = new RelationEquipement();
        relationSprintCeinture.setStatutRelationEquipement(StatutRelationEquipement.REQUIS);
        relationSprintCeinture.setCommentaire("La ceinture renforcée est requise pour l'utilisation du 1080 Sprint");
        relationSprintCeinture.addEquipementCible(ceintureRenforcee);
        milleCentQuatreVingtSprint.addRelationEquipement(relationSprintCeinture);
        equipementRepository.save(milleCentQuatreVingtSprint);

        RelationEquipement relationQuantumCeinture = new RelationEquipement();
        relationQuantumCeinture.setStatutRelationEquipement(StatutRelationEquipement.REQUIS);
        relationQuantumCeinture.setCommentaire("La ceinture renforcée est requise pour l'utilisation du 1080 Quantum");
        relationQuantumCeinture.addEquipementCible(ceintureRenforcee);
        milleCentQuatreVingtQuantum.addRelationEquipement(relationQuantumCeinture);
        equipementRepository.save(milleCentQuatreVingtQuantum);

        RelationEquipement relationKitEmgDelsys = new RelationEquipement();
        relationKitEmgDelsys.setStatutRelationEquipement(StatutRelationEquipement.RECOMMANDE);
        relationKitEmgDelsys.setCommentaire("Le Delsys Trigger Module est recommandé pour synchroniser le Kit EMG avec d'autres systèmes");
        relationKitEmgDelsys.addEquipementCible(delsysTriggerModule);
        kitEmgSensor.addRelationEquipement(relationKitEmgDelsys);
        equipementRepository.save(kitEmgSensor);

        RelationEquipement relationCameraSyncCamera = new RelationEquipement();
        relationCameraSyncCamera.setStatutRelationEquipement(StatutRelationEquipement.COMPATIBLE);
        relationCameraSyncCamera.setCommentaire("La Camera Sync Unit est compatible avec la caméra sur trépied et le fond vert");
        relationCameraSyncCamera.addEquipementCible(cameraSurTrepied);
        relationCameraSyncCamera.addEquipementCible(fondVert);
        cameraSyncUnit.addRelationEquipement(relationCameraSyncCamera);
        equipementRepository.save(cameraSyncUnit);

        RelationEquipement relationTobiiRazer = new RelationEquipement();
        relationTobiiRazer.setStatutRelationEquipement(StatutRelationEquipement.RECOMMANDE);
        relationTobiiRazer.setCommentaire("Le Razer est recommandé pour le traitement des données TOBII Pro Glasses");
        relationTobiiRazer.addEquipementCible(razer);
        tobiiProGlasses.addRelationEquipement(relationTobiiRazer);
        equipementRepository.save(tobiiProGlasses);

        // =====================
        // LISTES EQUIPEMENTS
        // =====================

        ListeEquipements listeAnalyseMouvement = new ListeEquipements();
        listeAnalyseMouvement.setNom("Analyse du mouvement");
        listeAnalyseMouvement.setDescription("Équipements pour une session d'analyse biomécanique complète");
        listeAnalyseMouvement.setUtilisateur(premierUtilisateur);
        listeAnalyseMouvement.getEquipements().add(kitPlateformeDeForce);
        listeAnalyseMouvement.getEquipements().add(kitEmgSensor);
        listeAnalyseMouvement.getEquipements().add(cameraSurTrepied);
        listeAnalyseMouvement.getEquipements().add(delsysTriggerModule);
        listeEquipementsRepository.save(listeAnalyseMouvement);

        ListeEquipements listePerformanceSportive = new ListeEquipements();
        listePerformanceSportive.setNom("Performance sportive");
        listePerformanceSportive.setDescription("Matériel pour mesure de la performance athlétique");
        listePerformanceSportive.setUtilisateur(deuxiemeUtilisateur);
        listePerformanceSportive.getEquipements().add(milleCentQuatreVingtSprint);
        listePerformanceSportive.getEquipements().add(ceintureRenforcee);
        listePerformanceSportive.getEquipements().add(optojump);
        listePerformanceSportive.getEquipements().add(chronometre);
        listeEquipementsRepository.save(listePerformanceSportive);

        ListeEquipements listeRealiteVirtuelle = new ListeEquipements();
        listeRealiteVirtuelle.setNom("Réalité virtuelle et mixte");
        listeRealiteVirtuelle.setDescription("Casques et équipements XR du laboratoire");
        listeRealiteVirtuelle.setUtilisateur(quatriemeUtilisateur);
        listeRealiteVirtuelle.getEquipements().add(metaQuest);
        listeRealiteVirtuelle.getEquipements().add(hololensDeux);
        listeRealiteVirtuelle.getEquipements().add(tracker);
        listeEquipementsRepository.save(listeRealiteVirtuelle);

        // =====================
        // RESERVATIONS + SESSIONS + EMPRUNTS
        // =====================

        // Réservation validée — premierUtilisateur
        Reservation reservationAnalyseBiomecanique = new Reservation();
        reservationAnalyseBiomecanique.setUtilisateur(premierUtilisateur);
        reservationAnalyseBiomecanique.setTitre("Analyse biomécanique TP L3");
        reservationAnalyseBiomecanique.setDescription("Session d'analyse de la marche avec plateforme de force et EMG pour TP de L3 STAPS");
        reservationAnalyseBiomecanique.setStatut(StatutReservation.VALIDEE);

        Session sessionAnalyseBiomecanique = new Session();
        sessionAnalyseBiomecanique.setDebut(LocalDateTime.now().plusDays(2));
        sessionAnalyseBiomecanique.setFin(LocalDateTime.now().plusDays(2).plusHours(3));

        Emprunt empruntPlateformeForce = new Emprunt();
        empruntPlateformeForce.setExemplaire(exemplaireKitPlateformeDeForceUn);
        empruntPlateformeForce.setDateRetourPrevue(LocalDateTime.now().plusDays(2).plusHours(3));
        empruntPlateformeForce.setStatut(StatutEmprunt.PLANIFIE);
        sessionAnalyseBiomecanique.addEmprunt(empruntPlateformeForce);

        Emprunt empruntKitEmg = new Emprunt();
        empruntKitEmg.setExemplaire(exemplaireKitEmgSensorDeux);
        empruntKitEmg.setDateRetourPrevue(LocalDateTime.now().plusDays(2).plusHours(3));
        empruntKitEmg.setStatut(StatutEmprunt.PLANIFIE);
        sessionAnalyseBiomecanique.addEmprunt(empruntKitEmg);

        reservationAnalyseBiomecanique.addSession(sessionAnalyseBiomecanique);

        HistoriqueReservation historiqueCreationAnalyse = new HistoriqueReservation();
        historiqueCreationAnalyse.setUtilisateur(premierUtilisateur);
        historiqueCreationAnalyse.setDate(LocalDateTime.now().minusDays(3));
        historiqueCreationAnalyse.setAction(StatutActionReservation.CREATION);
        historiqueCreationAnalyse.setCommentaire("Réservation pour le TP biomécanique L3");
        reservationAnalyseBiomecanique.addHistorique(historiqueCreationAnalyse);

        HistoriqueReservation historiqueValidationAnalyse = new HistoriqueReservation();
        historiqueValidationAnalyse.setUtilisateur(administrateur);
        historiqueValidationAnalyse.setDate(LocalDateTime.now().minusDays(2));
        historiqueValidationAnalyse.setAction(StatutActionReservation.VALIDATION);
        historiqueValidationAnalyse.setCommentaire("Validée — matériel disponible");
        reservationAnalyseBiomecanique.addHistorique(historiqueValidationAnalyse);

        reservationRepository.save(reservationAnalyseBiomecanique);

        // Réservation en attente — deuxiemeUtilisateur
        Reservation reservationPerformanceSprint = new Reservation();
        reservationPerformanceSprint.setUtilisateur(deuxiemeUtilisateur);
        reservationPerformanceSprint.setTitre("Mesure performance sprint M2");
        reservationPerformanceSprint.setDescription("Protocole de mesure de la puissance et vitesse en sprint avec 1080 Sprint et OPTOJUMP");
        reservationPerformanceSprint.setStatut(StatutReservation.EN_ATTENTE);

        Session sessionPerformanceSprint = new Session();
        sessionPerformanceSprint.setDebut(LocalDateTime.now().plusDays(5));
        sessionPerformanceSprint.setFin(LocalDateTime.now().plusDays(5).plusHours(4));

        Emprunt empruntMilleCentQuatreVingtSprint = new Emprunt();
        empruntMilleCentQuatreVingtSprint.setExemplaire(exemplaireMilleCentQuatreVingtSprintUn);
        empruntMilleCentQuatreVingtSprint.setDateRetourPrevue(LocalDateTime.now().plusDays(5).plusHours(4));
        empruntMilleCentQuatreVingtSprint.setStatut(StatutEmprunt.PLANIFIE);
        sessionPerformanceSprint.addEmprunt(empruntMilleCentQuatreVingtSprint);

        Emprunt empruntOptojump = new Emprunt();
        empruntOptojump.setExemplaire(exemplaireOptojumpUn);
        empruntOptojump.setDateRetourPrevue(LocalDateTime.now().plusDays(5).plusHours(4));
        empruntOptojump.setStatut(StatutEmprunt.PLANIFIE);
        sessionPerformanceSprint.addEmprunt(empruntOptojump);

        reservationPerformanceSprint.addSession(sessionPerformanceSprint);

        HistoriqueReservation historiqueCreationSprint = new HistoriqueReservation();
        historiqueCreationSprint.setUtilisateur(deuxiemeUtilisateur);
        historiqueCreationSprint.setDate(LocalDateTime.now().minusHours(5));
        historiqueCreationSprint.setAction(StatutActionReservation.CREATION);
        historiqueCreationSprint.setCommentaire("En attente de validation admin");
        reservationPerformanceSprint.addHistorique(historiqueCreationSprint);

        reservationRepository.save(reservationPerformanceSprint);

        // Réservation refusée — troisiemeUtilisateur
        Reservation reservationRefusee = new Reservation();
        reservationRefusee.setUtilisateur(troisiemeUtilisateur);
        reservationRefusee.setTitre("Emprunt Meta Quest");
        reservationRefusee.setDescription("Demande d'emprunt de casques Meta Quest pour projet étudiant");
        reservationRefusee.setStatut(StatutReservation.REFUSEE);

        HistoriqueReservation historiqueCreationRefusee = new HistoriqueReservation();
        historiqueCreationRefusee.setUtilisateur(troisiemeUtilisateur);
        historiqueCreationRefusee.setDate(LocalDateTime.now().minusDays(5));
        historiqueCreationRefusee.setAction(StatutActionReservation.CREATION);
        reservationRefusee.addHistorique(historiqueCreationRefusee);

        HistoriqueReservation historiqueRefus = new HistoriqueReservation();
        historiqueRefus.setUtilisateur(administrateur);
        historiqueRefus.setDate(LocalDateTime.now().minusDays(4));
        historiqueRefus.setAction(StatutActionReservation.REFUS);
        historiqueRefus.setCommentaire("Compte utilisateur expiré — renouveler l'inscription");
        reservationRefusee.addHistorique(historiqueRefus);

        reservationRepository.save(reservationRefusee);

        // Réservation terminée — quatriemeUtilisateur
        Reservation reservationEyeTracking = new Reservation();
        reservationEyeTracking.setUtilisateur(quatriemeUtilisateur);
        reservationEyeTracking.setTitre("Étude eye-tracking attention visuelle");
        reservationEyeTracking.setDescription("Protocole de recherche sur l'attention visuelle en situation de conduite simulée");
        reservationEyeTracking.setStatut(StatutReservation.VALIDEE);

        Session sessionEyeTracking = new Session();
        sessionEyeTracking.setDebut(LocalDateTime.now().minusDays(10));
        sessionEyeTracking.setFin(LocalDateTime.now().minusDays(10).plusHours(6));

        Emprunt empruntTobii = new Emprunt();
        empruntTobii.setExemplaire(exemplaireTobiiProGlassesUn);
        empruntTobii.setDateRetourPrevue(LocalDateTime.now().minusDays(10).plusHours(6));
        empruntTobii.setDateRetourReelle(LocalDateTime.now().minusDays(10).plusHours(6).plusMinutes(30));
        empruntTobii.setStatut(StatutEmprunt.TERMINE);
        sessionEyeTracking.addEmprunt(empruntTobii);

        Emprunt empruntRazer = new Emprunt();
        empruntRazer.setExemplaire(exemplaireRazerUn);
        empruntRazer.setDateRetourPrevue(LocalDateTime.now().minusDays(10).plusHours(6));
        empruntRazer.setDateRetourReelle(LocalDateTime.now().minusDays(10).plusHours(6));
        empruntRazer.setStatut(StatutEmprunt.TERMINE);
        sessionEyeTracking.addEmprunt(empruntRazer);

        reservationEyeTracking.addSession(sessionEyeTracking);

        HistoriqueReservation historiqueCreationEyeTracking = new HistoriqueReservation();
        historiqueCreationEyeTracking.setUtilisateur(quatriemeUtilisateur);
        historiqueCreationEyeTracking.setDate(LocalDateTime.now().minusDays(12));
        historiqueCreationEyeTracking.setAction(StatutActionReservation.CREATION);
        reservationEyeTracking.addHistorique(historiqueCreationEyeTracking);

        HistoriqueReservation historiqueValidationEyeTracking = new HistoriqueReservation();
        historiqueValidationEyeTracking.setUtilisateur(administrateur);
        historiqueValidationEyeTracking.setDate(LocalDateTime.now().minusDays(11));
        historiqueValidationEyeTracking.setAction(StatutActionReservation.VALIDATION);
        historiqueValidationEyeTracking.setCommentaire("Validée pour l'étude de recherche");
        reservationEyeTracking.addHistorique(historiqueValidationEyeTracking);

        reservationRepository.save(reservationEyeTracking);

        System.out.println("=== DATASET INITIALISÉ ===");
        System.out.println("✓ 5 utilisateurs (1 admin, 3 users actifs, 1 expiré)");
        System.out.println("✓ 22 équipements du laboratoire avec exemplaires");
        System.out.println("✓ 8 labels thématiques");
        System.out.println("✓ 5 relations entre équipements");
        System.out.println("✓ 3 listes d'équipements personnelles");
        System.out.println("✓ 4 réservations couvrant tous les statuts");
    }
}