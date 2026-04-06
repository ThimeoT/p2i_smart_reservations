import env from './env';
import tokenManager from './tokenManager';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, statusText: string, body: unknown) {
    super(`HTTP ${status} ${statusText}`);
    this.status = status;
    this.body = body;
  }
}

function resolveUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const base = env.API_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

async function handleResponse(response: Response) {
  const contentType = response.headers.get('Content-Type') || '';

  if (response.ok) {
    if (response.status === 204) return null;
    if (contentType.includes('application/json')) return response.json();
    return response.text();
  }

  let payload: unknown = null;
  try {
    payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text();
  } catch {
    payload = null;
  }

  throw new ApiError(response.status, response.statusText, payload);
}

const defaultHeaders: Record<string, string> = {
  Accept: 'application/json',
};

const fetchClient = {
  request: async (
    method: string,
    path: string,
    body?: BodyInit | null,
    options?: RequestInit,
  ) => {
    const token = tokenManager.get();
    console.log('[fetchClient] token:', token); // 👈
    console.log('[fetchClient] headers:', {
      ...defaultHeaders,
      ...(options?.headers as Record<string, string> | undefined),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
    const headers: Record<string, string> = {
      ...defaultHeaders,
      ...(options?.headers as Record<string, string> | undefined),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const init: RequestInit = {
      credentials: 'include',
      ...options,
      method,
      headers,
      body,
    };

    const response = await fetch(resolveUrl(path), init);
    return handleResponse(response);
  },

  get(path: string, options?: RequestInit) {
    return this.request('GET', path, null, options);
  },

  post(path: string, body?: BodyInit | null, options?: RequestInit) {
    return this.request('POST', path, body, options);
  },

  postJson<T>(path: string, body: T, options?: RequestInit) {
    return this.request('POST', path, JSON.stringify(body), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers as Record<string, string> | undefined),
      },
    });
  },

  put(path: string, body?: BodyInit | null, options?: RequestInit) {
    return this.request('PUT', path, body, options);
  },

  putJson<T>(path: string, body: T, options?: RequestInit) {
    return this.request('PUT', path, JSON.stringify(body), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers as Record<string, string> | undefined),
      },
    });
  },

  delete(path: string, options?: RequestInit) {
    return this.request('DELETE', path, null, options);
  },
};

export default fetchClient;
