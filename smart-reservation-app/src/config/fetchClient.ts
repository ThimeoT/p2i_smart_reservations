import env from './env';

function resolveUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const base = env.API_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

async function handleResponse(response: Response) {
  //logs j
  console.debug('[handleResponse] status:', response.status)
  console.debug('[handleResponse] url:', response.url)        // ← url finale après redirect
  console.debug('[handleResponse] ok:', response.ok)
  const contentType = response.headers.get('Content-Type') || ''
  console.debug('[handleResponse] contentType:', contentType)


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

  const error = new Error(`HTTP ${response.status} ${response.statusText}`);
  (error as any).status = response.status;
  (error as any).body = payload;
  throw error;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}



const defaultHeaders: Record<string, string> = {
  Accept: 'application/json',
};

const defaultOptions: RequestInit = {
  credentials: 'include',
  headers: defaultHeaders,
};

const fetchClient = {
  request: async (
    method: string,
    path: string,
    body?: BodyInit | null,
    options?: RequestInit,
  ) => {

    const xsrfToken = getCookie('XSRF-TOKEN');

    const headers = {
      ...defaultHeaders,
      ...(options?.headers as Record<string, string> | undefined),
      ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
    };

    const init: RequestInit = {
      ...defaultOptions,
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

  put(path: string, body?: BodyInit | null, options?: RequestInit) {
    return this.request('PUT', path, body, options);
  },

  delete(path: string, options?: RequestInit) {
    return this.request('DELETE', path, null, options);
  },
};

export default fetchClient;
