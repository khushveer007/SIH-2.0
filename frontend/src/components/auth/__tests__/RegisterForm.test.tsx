import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';
import { AuthContext } from '@/context/AuthContext';

function renderWithAuth(ui: React.ReactElement, ctxOverrides: any = {}) {
  const value = {
    user: null,
    loading: false,
    initializing: false,
    login: vi.fn(),
    register: vi.fn(async (data: any) => ({ ok: data.email === 'new@example.com', message: data.email === 'new@example.com' ? undefined : 'Email taken' })),
    logout: vi.fn(),
    token: null,
    ...ctxOverrides
  };
  return { ...render(<AuthContext.Provider value={value}>{ui}</AuthContext.Provider>), ctx: value };
}

describe('RegisterForm', () => {
  it('disables submit until dirty & valid', () => {
    renderWithAuth(<RegisterForm />);
    const btn = screen.getByRole('button', { name: /create account/i });
    expect(btn).toBeDisabled();
  });

  it('shows validation errors on blur', async () => {
    renderWithAuth(<RegisterForm />);
    const username = screen.getByLabelText(/username/i);
    const email = screen.getByLabelText(/email/i);
    const passwordInputs = screen.getAllByLabelText(/password/i);
    const password = passwordInputs[0];
    const confirm = passwordInputs[1];
    [username, email, password, confirm].forEach(el => fireEvent.blur(el));
    await screen.findByText(/username too short/i);
    await screen.findByText(/email is required/i);
    await screen.findByText(/password must be at least 8 characters/i);
    await screen.findByText(/confirm your password/i);
  });

  it('password confirmation mismatch shows error', async () => {
    renderWithAuth(<RegisterForm />);
    const username = screen.getByLabelText(/username/i);
    const email = screen.getByLabelText(/email/i);
    fireEvent.change(username, { target: { value: 'newuser' } });
    fireEvent.change(email, { target: { value: 'new@example.com' } });
    const [password, confirm] = screen.getAllByLabelText(/password/i);
    fireEvent.change(password, { target: { value: 'Password123' } });
    fireEvent.blur(password);
    fireEvent.change(confirm, { target: { value: 'Password124' } });
    fireEvent.blur(confirm); // trigger confirm validation (mode onBlur)
    // Blur username & email to ensure holistic validation state (not strictly required for mismatch but keeps consistency)
    fireEvent.blur(username);
    fireEvent.blur(email);
    await screen.findByText(/passwords do not match/i);
  });

  it('successful registration calls register', async () => {
    const { ctx } = renderWithAuth(<RegisterForm />);
    const username = screen.getByLabelText(/username/i);
    const email = screen.getByLabelText(/email/i);
    fireEvent.change(username, { target: { value: 'newuser' } });
    fireEvent.change(email, { target: { value: 'new@example.com' } });
    const [password, confirm] = screen.getAllByLabelText(/password/i);
    fireEvent.change(password, { target: { value: 'Password123' } });
    fireEvent.blur(password);
    fireEvent.change(confirm, { target: { value: 'Password123' } });
    fireEvent.blur(confirm);
    // Blur remaining fields to trigger their validation (mode onBlur) so isValid can become true
    fireEvent.blur(username);
    fireEvent.blur(email);
    const btn = screen.getByRole('button', { name: /create account/i });
    await waitFor(() => expect(btn).not.toBeDisabled());
    fireEvent.click(btn);
    await waitFor(() => expect(ctx.register).toHaveBeenCalled());
  });
});
