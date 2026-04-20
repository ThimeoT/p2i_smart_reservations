import fetchClient from '../../../config/fetchClient';
import type {
  AuthUser,
  InitialisationFormData,
  InvitationRequest,
  InvitationResponse,
  LoginCredentials,
} from '../types/auth.types';

export const loginApi = async (
  credentials: LoginCredentials,
): Promise<{user : AuthUser, token : string}> => {
  const response = await fetchClient.postJson('/login', credentials);
  if (response.statut === 'EXPIRE') {
    throw new Error('Votre accès a expiré. Contactez un administrateur.');
  }
  if (response.statut === 'DESACTIVE') {
    throw new Error(
      'Votre compte a été désactivé. Contactez un administrateur.',
    );
  }

  localStorage.setItem('token', response.token);

  return {
    
    token: response.token,
    user: {
      id: response.id,
      mail: response.mail,
      role: response.role,
      statut: response.statut,}
  };
};

export const getMeApi = async (): Promise<AuthUser> => {
  return fetchClient.get('/user/current');
};

export const logoutApi = async (): Promise<void> => {
  // on ne fait pas de logout car les sessions sont en stateless
  // je le laisse au cas où cela devrait changer
};

export const inviteUserApi = async (
  data: InvitationRequest,
): Promise<InvitationResponse> => {
  return fetchClient.postJson('/utilisateurs/invitation', data);
};

export const initialisationApi = async (
  data: InitialisationFormData,
): Promise<void> => {
  const { id, ...payload } = data;
  await fetchClient.postJson(`/utilisateurs/${id}/initialisation`, payload);
};