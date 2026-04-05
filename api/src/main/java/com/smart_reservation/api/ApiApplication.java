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

import java.time.LocalDate;

@SpringBootApplication
@Component
@RequiredArgsConstructor
public class ApiApplication  {
    static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}
