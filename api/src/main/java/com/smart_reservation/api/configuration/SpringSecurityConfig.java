package com.smart_reservation.api.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtFilter jwtFilter;

    @Value("${spring.h2.console.enabled:false}")
    private boolean h2ConsoleEnabled;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    if (h2ConsoleEnabled) {
                        auth.requestMatchers("/h2/**").permitAll();
                    }
                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    auth.requestMatchers("/login").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/logout").permitAll();
                    auth.requestMatchers("/user/current").authenticated();
                    auth.requestMatchers("/user").hasRole("USER");
                    auth.requestMatchers("/admin").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/initialisation").authenticated();

                    auth.requestMatchers(HttpMethod.GET, "/utilisateurs").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.GET, "/utilisateurs/{id}").authenticated();
                    auth.requestMatchers(HttpMethod.PUT, "/utilisateurs/{id}").authenticated();
                    auth.requestMatchers(HttpMethod.POST, "/utilisateurs/{id}/initialisation").authenticated();
                    auth.requestMatchers(HttpMethod.DELETE, "/utilisateurs/{id}").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/utilisateurs").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/utilisateurs/invitation").hasRole("ADMIN");

                    auth.requestMatchers(HttpMethod.GET, "/equipements").authenticated();
                    auth.requestMatchers(HttpMethod.GET, "/equipements/{id}").authenticated();
                    auth.requestMatchers(HttpMethod.POST, "/equipements").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/equipements/{id}").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/equipements/{id}").hasRole("ADMIN");

                    auth.requestMatchers(HttpMethod.GET, "/exemplaires").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/exemplaires").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/exemplaires/{id}").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/exemplaires/{id}").hasRole("ADMIN");
                    auth.requestMatchers("/error").permitAll();

                    auth.anyRequest().authenticated();
                })
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:8080"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http
                .getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(customUserDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);
        return authenticationManagerBuilder.build();
    }

}
