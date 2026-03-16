package com.smart_reservation.api;

import com.smart_reservation.api.controller.UtilisateurController;
import com.smart_reservation.api.dto.mapper.UtilisateurMapper;
import com.smart_reservation.api.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication implements CommandLineRunner{

	static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("=== SMART RESERVATIONS | BACK-END ===");
	}
}
