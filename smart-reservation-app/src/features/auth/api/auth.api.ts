import fetchClient from '../../../config/fetchClient';
import type { LoginCredentials } from '../types/auth.types';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export const loginApi = async (credentials: LoginCredentials) => {
  console.debug('[loginApi] credentials', credentials);

  await fetchClient.get('/csrf');

  const token = getCookie('XSRF-TOKEN');
  console.debug('[loginApi] csrf token', token);

  if (!token) {
    throw new Error('CSRF token manquant');
  }

  const params = new URLSearchParams();
  params.append('username', credentials.username);
  params.append('password', credentials.password);

  const response = await fetchClient.post('/login', params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-XSRF-TOKEN': token,
    },
  });

  console.debug('[loginApi] login response', response);
  return response;
};

export const getMeApi = async () => {
  return fetchClient.get('/user/current'); // à créer côté Spring
};

export const logoutApi = async (): Promise<void> => {
  await fetchClient.post('/logout/');
};
