package com.smart_reservation.api.configuration;

import java.util.ArrayList;
import java.util.List;

import com.smart_reservation.api.exception.RessourceIntrouvableException;
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

    private final UtilisateurRepository dbUserRepository;

    @Override
    public UserDetails loadUserByUsername(@Email String mail) throws UsernameNotFoundException {
        Utilisateur user = dbUserRepository.findByMail(mail).orElseThrow(()-> new RessourceIntrouvableException("Utilisateur","le mail",mail));

        return new User(user.getMail(), user.getMotDePasseHash(), getGrantedAuthorities(user.getRole()));
    }

    private List<GrantedAuthority> getGrantedAuthorities(String role) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
        return authorities;
    }
}

