/**
 * auth.ts (placeholder)
 * Will contain thin wrappers over fetch for register & login requests.
 * We intentionally keep this minimal until Task 7.3 integration.
 */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  confirmPassword?: string; // client-only; not sent to server
  name?: string;
}

export interface AuthSuccess {
  token: string;
}

export interface AuthError {
  error: string;
}

export type AuthResponse = AuthSuccess | AuthError;

// Endpoints assumed; adjust if backend exposes different path prefix.
// const BASE = '/api/auth'; // reserved for use in Task 7.3 when integrating real fetch calls

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  // Placeholder: replaced with real implementation in Task 7.3
  console.warn('[auth] loginUser called before implementation', payload);
  return { error: 'Not implemented yet' };
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  console.warn('[auth] registerUser called before implementation', payload);
  return { error: 'Not implemented yet' };
}
