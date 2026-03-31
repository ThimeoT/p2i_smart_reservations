package com.smart_reservation.api;

import com.smart_reservation.api.controller.UtilisateurController;
import com.smart_reservation.api.dto.mapper.UtilisateurMapper;
import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@SpringBootApplication
@Component
@RequiredArgsConstructor
public class ApiApplication implements CommandLineRunner{

	private final UtilisateurRepository utilisateurRepository;
	private final BCryptPasswordEncoder passwordEncoder;

	static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("=== SMART RESERVATIONS | BACK-END ===");
		if(utilisateurRepository.findByMail("admin@test.com").isEmpty()) {
			Utilisateur admin = new Utilisateur();
			admin.setMail("admin@test.com");
			admin.setMotDePasseHash(passwordEncoder.encode("admin"));
			admin.setRole("ADMIN");
			utilisateurRepository.save(admin);
		}

		if(utilisateurRepository.findByMail("user@test.com").isEmpty()) {
			Utilisateur user = new Utilisateur();
			user.setMail("user@test.com");
			user.setMotDePasseHash(passwordEncoder.encode("user"));
			user.setRole("USER");
			utilisateurRepository.save(user);
		}

	}
}
