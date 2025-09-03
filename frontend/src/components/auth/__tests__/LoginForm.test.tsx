import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { AuthContext } from '@/context/AuthContext';

function renderWithAuth(ui: React.ReactElement, ctxOverrides: any = {}) {
  const value = {
    user: null,
    loading: false,
    initializing: false,
    login: vi.fn(async (email: string, password: string) => ({ ok: email === 'user@example.com' && password === 'Password123', message: 'Invalid credentials' })),
    register: vi.fn(),
    logout: vi.fn(),
    token: null,
    ...ctxOverrides
  };
  return { ...render(<AuthContext.Provider value={value}>{ui}</AuthContext.Provider>), ctx: value };
}

describe('LoginForm', () => {
  it('disables submit until dirty & valid', () => {
    renderWithAuth(<LoginForm />);
    const btn = screen.getByRole('button', { name: /sign in/i });
    expect(btn).toBeDisabled();
  });

  it('shows validation errors after blur', async () => {
    renderWithAuth(<LoginForm />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    // Trigger blur without entering values
    fireEvent.blur(email);
    fireEvent.blur(password);
    await screen.findByText(/email is required/i);
    await screen.findByText(/password must be at least 8 characters/i);
  });

  it('successful login calls context login', async () => {
    const { ctx } = renderWithAuth(<LoginForm />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.change(password, { target: { value: 'Password123' } });
    // trigger blur since form uses mode='onBlur' for initial validation
    fireEvent.blur(email);
    fireEvent.blur(password);
    const btn = screen.getByRole('button', { name: /sign in/i });
    // Form becomes valid once both fields set
    // React Hook Form validation resolved asynchronously; wait until enabled
    await waitFor(() => expect(btn).not.toBeDisabled());
    fireEvent.click(btn);
    await waitFor(() => expect(ctx.login).toHaveBeenCalled());
  });

  it('failed login shows server error', async () => {
    const { ctx } = renderWithAuth(<LoginForm />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    fireEvent.change(email, { target: { value: 'bad@example.com' } });
    fireEvent.change(password, { target: { value: 'Password123' } });
    fireEvent.blur(email);
    fireEvent.blur(password);
    const btn = screen.getByRole('button', { name: /sign in/i });
    await waitFor(() => expect(btn).not.toBeDisabled());
    fireEvent.click(btn);
    // server error element appears with role alert
    await screen.findByRole('alert');
    expect(ctx.login).toHaveBeenCalled();
  });
});
