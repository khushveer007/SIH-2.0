import { describe, it, expect } from 'vitest';
import { render, waitFor, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { __internal } from '../../test/handlers';

function StateProbe() {
  const { user, token, initializing, loading, login, register } = useAuth();
  return (
    <div>
      <pre aria-label="auth-state">{JSON.stringify({ user, token, initializing, loading })}</pre>
      {/* Expose imperative functions on window for test control */}
      <button onClick={() => login('existing@example.com', 'Password123')} aria-label="do-login">login</button>
      <button onClick={() => register('brandnew@example.com', 'Password123', 'brandnew')} aria-label="do-register">register</button>
    </div>
  );
}

function parseState() {
  const pre = screen.getByLabelText('auth-state');
  return JSON.parse(pre.textContent || '{}');
}

describe('AuthContext integration', () => {
  it('hydrates successfully with valid token', async () => {
  // Set token and MSW mapping before rendering to ensure hydration uses it
  localStorage.setItem('auth_token', 'token-u1');
  __internal.tokenToUserId.set('token-u1', 'u1');
  render(<AuthProvider><StateProbe /></AuthProvider>);
    await waitFor(() => expect(parseState().initializing).toBe(false));
    const state = parseState();
    // Debug output for diagnosis
    // eslint-disable-next-line no-console
    console.log('Hydration state:', state);
    if (!state.user) {
      throw new Error('Hydration failed: user is null. Token in localStorage: ' + localStorage.getItem('auth_token'));
    }
    expect(state.user.email).toBe('existing@example.com');
  });

  it('clears invalid token on failed hydration', async () => {
    localStorage.setItem('auth_token', 'token-invalid');
    render(<AuthProvider><StateProbe /></AuthProvider>);
    await waitFor(() => expect(parseState().initializing).toBe(false));
    const state = parseState();
    expect(state.user).toBeNull();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('login flow sets user and token', async () => {
    render(<AuthProvider><StateProbe /></AuthProvider>);
    const loginBtn = screen.getByLabelText('do-login');
    await act(async () => { loginBtn.click(); });
    await waitFor(() => expect(parseState().user).toBeTruthy());
    const state = parseState();
    expect(state.token).toBeTruthy();
  });

  it('register flow auto logs in new user', async () => {
    render(<AuthProvider><StateProbe /></AuthProvider>);
    const registerBtn = screen.getByLabelText('do-register');
    await act(async () => { registerBtn.click(); });
    await waitFor(() => expect(parseState().user?.email).toBe('brandnew@example.com'));
    const state = parseState();
    expect(state.token).toBeTruthy();
  });
});
