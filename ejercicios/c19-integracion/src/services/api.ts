const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'libreria_token';

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

type ApiErrorBody = {
  error?: string;
  mensaje?: string;
  details?: unknown;
  detalles?: unknown;
};

export function guardarToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function obtenerToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function borrarToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const token = obtenerToken();
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = 'Error al comunicarse con la API';

    try {
      const data = (await response.json()) as ApiErrorBody;
      message = data.error ?? data.mensaje ?? message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}