/**
 * auth.ts
 * Thin typed wrappers over backend auth endpoints.
 * Handles JSON parsing, error normalization, and token persistence.
 */

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload { email: string; password: string; username: string; role?: string; }

export interface UserInfo { id: string; username: string; email: string; role?: string; }

export interface LoginSuccess { token: string; user: UserInfo; }
export interface RegisterSuccess { user: UserInfo; } // backend does not auto issue token on register

export interface ApiError { message: string; status?: number; }

export type LoginResult = { ok: true; data: LoginSuccess } | { ok: false; error: ApiError };
export type RegisterResult = { ok: true; data: RegisterSuccess } | { ok: false; error: ApiError };

const BASE = '/api/auth';
const TOKEN_KEY = 'auth_token';

function storeToken(token: string) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch { /* ignore */ }
}
export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
export function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
}

async function parseJsonSafe(res: Response) {
  try { return await res.json(); } catch { return {}; }
}

function normalizeError(res: Response, body: any): ApiError {
  if (body?.error?.message) return { message: body.error.message, status: body.error.status || res.status };
  if (body?.message) return { message: body.message, status: res.status };
  return { message: res.statusText || 'Request failed', status: res.status };
}

export async function loginUser(payload: LoginPayload): Promise<LoginResult> {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    return { ok: false, error: normalizeError(res, body) };
  }
  if (body.token) storeToken(body.token);
  return { ok: true, data: { token: body.token, user: body.user } };
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResult> {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    return { ok: false, error: normalizeError(res, body) };
  }
  return { ok: true, data: { user: body.user } };
}

export async function fetchMe(): Promise<{ ok: true; user: UserInfo } | { ok: false; error: ApiError }> {
  const token = getToken();
  if (!token) return { ok: false, error: { message: 'Not authenticated' } };
  const res = await fetch(`${BASE}/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) return { ok: false, error: normalizeError(res, body) };
  return { ok: true, user: body.user };
}
