import fetchClient from '../../../config/fetchClient';
import type { AuthTokenResponse, AuthUser, LoginCredentials } from '../types/auth.types';

export const loginApi = async (credentials: LoginCredentials): Promise<AuthTokenResponse> => {
    return fetchClient.postJson("/login", credentials)
}

export const getMeApi = async (): Promise<AuthUser> => {
  return fetchClient.get('/user/current'); 
};

export const logoutApi = async (): Promise<void> => {
  await fetchClient.post('/logout');
};
