package com.smart_reservation.api.controllerTests;

import com.smart_reservation.api.controller.UtilisateurController;
import com.smart_reservation.api.dto.response.UtilisateurResponseDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.service.UtilisateurService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.List;


import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UtilisateurController.class)
public class UtilisateurControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UtilisateurService utilisateurService;

    private UtilisateurResponseDto buildResponseDto(Long id, String nom) {
        UtilisateurResponseDto dto = new UtilisateurResponseDto();
        dto.id = id;
        dto.nom = nom;
        return dto;
    }

    @Test
    @WithMockUser
    public void testGetUtilisateursRenvoieOk() throws Exception {
        // GIVEN
        List<UtilisateurResponseDto> dtos = List.of(
                new UtilisateurResponseDto(),
                new UtilisateurResponseDto(),
                new UtilisateurResponseDto()
        );
        when(utilisateurService.getUtilisateurs()).thenReturn(dtos);

        // WHEN / THEN
        mockMvc.perform(get("/utilisateurs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));

        verify(utilisateurService, times(1)).getUtilisateurs();
    }

    @Test
    @WithMockUser
    public void testGetUtilisateurExistantRenvoieOk() throws Exception {
        // GIVEN
        when(utilisateurService.getUtilisateur(1L))
                .thenReturn(buildResponseDto(1L, "Dupont"));

        // WHEN / THEN
        mockMvc.perform(get("/utilisateurs/1"))
                .andExpect(status().isOk())
                .andExpect((ResultMatcher) jsonPath("$.nom").value("Dupont"));

        verify(utilisateurService, times(1)).getUtilisateur(1L);
    }

    @Test
    @WithMockUser
    public void testGetUtilisateurInexistantRenvoieNotFound() throws Exception {
        // GIVEN
        when(utilisateurService.getUtilisateur(10L))
                .thenThrow(new RessourceIntrouvableException("Utilisateur", 10L));

        // WHEN / THEN
        mockMvc.perform(get("/utilisateurs/10"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void testDeleteUtilisateurExistantRenvoieNoContent() throws Exception {
        // GIVEN — deleteUtilisateur ne retourne rien, pas besoin de when
        doNothing().when(utilisateurService).deleteUtilisateur(1L);

        // WHEN / THEN
        mockMvc.perform(delete("/utilisateurs/1").with(csrf()))
                .andExpect(status().isNoContent());

        verify(utilisateurService, times(1)).deleteUtilisateur(1L);
    }

    @Test
    @WithMockUser
    public void testDeleteUtilisateurInexistantRenvoieNotFound() throws Exception {
        // GIVEN
        doThrow(new RessourceIntrouvableException("Utilisateur", 10L))
                .when(utilisateurService).deleteUtilisateur(10L);

        // WHEN / THEN
        mockMvc.perform(delete("/utilisateurs/10").with(csrf()))
                .andExpect(status().isNotFound());

        verify(utilisateurService, times(1)).deleteUtilisateur(10L);
    }
}