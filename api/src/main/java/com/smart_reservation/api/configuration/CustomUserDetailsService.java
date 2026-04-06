package com.smart_reservation.api.configuration;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.model.StatutUtilisateur;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.repository.UtilisateurRepository;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(@Email String mail) throws UsernameNotFoundException {
        Utilisateur user = utilisateurRepository.findByMail(mail).orElseThrow(() -> new RessourceIntrouvableException("Utilisateur", "le mail", mail));

        if (user.getDateExpiration() != null
                && user.getDateExpiration().isBefore(LocalDate.now())
                && user.getStatutUtilisateur() == StatutUtilisateur.ACTIF) {
            user.setStatutUtilisateur(StatutUtilisateur.EXPIRE);
            utilisateurRepository.save(user);
        }

        return new User(user.getMail(), user.getMotDePasseHash()
                ,user.getStatutUtilisateur() == StatutUtilisateur.ACTIF || user.getStatutUtilisateur() == StatutUtilisateur.INVITE,
                true,
                true,
                user.getStatutUtilisateur() != StatutUtilisateur.DESACTIVE,
                getGrantedAuthorities(user.getRole()));
    }

    private List<GrantedAuthority> getGrantedAuthorities(String role) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
        return authorities;
    }
}

