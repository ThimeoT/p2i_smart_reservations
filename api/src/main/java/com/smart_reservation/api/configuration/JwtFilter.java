package com.smart_reservation.api.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;



    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        System.out.println("[JwtFilter] >>> requête reçue: " + request.getRequestURI()
                + " | method: " + request.getMethod());

        final String authHeader = request.getHeader("Authorization");
        System.out.println("[JwtFilter] path: " + request.getRequestURI());
        System.out.println("[JwtFilter] authHeader: " + authHeader);


        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7); // Retire Bearer car inutile avec JWT
        System.out.println("[JwtFilter] token: " + token);
        System.out.println("[JwtFilter] isTokenValid: " + jwtService.isTokenValid(token));

        if (jwtService.isTokenValid(token)) {
            String mail = jwtService.extractMail(token);
            System.out.println("[JwtFilter] mail extrait: " + mail);

            UserDetails userDetails = userDetailsService.loadUserByUsername(mail);

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // pour le lier au contexte spring
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(request, response);
    }
}