package com.smart_reservation.api.controllerTests;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.smart_reservation.api.controller.UtilisateurController;
import com.smart_reservation.api.dto.UtilisateurDto;
import com.smart_reservation.api.exception.RessourceIntrouvableException;
import com.smart_reservation.api.mapper.UtilisateurMapper;
import com.smart_reservation.api.model.Utilisateur;
import com.smart_reservation.api.service.UtilisateurService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

@WebMvcTest(controllers = UtilisateurController.class)
public class UtilisateurControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UtilisateurMapper utilisateurMapper;

    @MockitoBean
    private UtilisateurService utilisateurService;

    @Test
    @WithMockUser
    public void testGetUtilisateursRenvoieOk() throws Exception {

        Utilisateur utilisateur1 = new Utilisateur();
        utilisateur1.setId(1L);
        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setId(2L);
        Utilisateur utilisateur3 = new Utilisateur();
        utilisateur3.setId(3L);

        List<Utilisateur> utilisateurs = Arrays.asList(utilisateur1, utilisateur2, utilisateur3);

        when(utilisateurService.getUtilisateurs()).thenReturn(utilisateurMapper.toDtoIterable(utilisateurs));

        mockMvc.perform(get("/utilisateurs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));

        verify(utilisateurService, times(1)).getUtilisateurs();
    }

    @Test
    @WithMockUser
    public void testGetUtilisateurExistantRenvoieOk() throws Exception {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(1L);
        

        when(utilisateurService.getUtilisateur(1L)).thenReturn(utilisateurMapper.toDto(utilisateur));

        mockMvc.perform(get("/utilisateurs/1")).andExpect(status().isOk());

        verify(utilisateurService, times(1)).getUtilisateur(1L);
    }

    @Test
    @WithMockUser
    public void testGetUtilisateurInexistantRenvoieNotFound() throws Exception {
        when(utilisateurService.getUtilisateur(10L)).thenThrow(new RessourceIntrouvableException("Utilisateur", 10L));

        mockMvc.perform(get("/utilisateurs/10")).andExpect(status().isNotFound());

        verify(utilisateurService, never()).deleteUtilisateur(1L);
    }

    @Test
    @WithMockUser
    public void testDeleteUtilisateurExistantRenvoieNoContent() throws Exception {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(1L);

        when(utilisateurService.getUtilisateur(1L)).thenReturn(utilisateurMapper.toDto(utilisateur));

        mockMvc.perform(delete("/utilisateurs/1").with(csrf())).andExpect(status().isNoContent());

        verify(utilisateurService, times(1)).deleteUtilisateur(1L);
    }

    @Test
    @WithMockUser
    public void testDeleteUtilisateurInexistantRenvoieNotFound() throws Exception {
        when(utilisateurService.getUtilisateur(10L)).thenThrow(new RessourceIntrouvableException("Utilisateur", 1L));

        mockMvc.perform(delete("/utilisateurs/10")).andExpect(status().isNotFound());

        verify(utilisateurService, never()).deleteUtilisateur(10L);
    }
}
