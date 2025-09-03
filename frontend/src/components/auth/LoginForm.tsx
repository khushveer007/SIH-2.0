import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from './schemas';
import { FormField } from './FormField';
import { useAuth } from '@/context/AuthContext';

/**
 * LoginForm
 * Implements react-hook-form + zod validation for email/password.
 * Network integration occurs in subtask 7.3 (currently simulated).
 */
interface LoginFormProps { autoFocusFirstField?: boolean }
export function LoginForm({ autoFocusFirstField }: LoginFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login, loading, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
    setFocus
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const focusFirstError = () => {
    const order: (keyof LoginSchema)[] = ['email', 'password'];
    for (const field of order) {
      if (errors[field]) { setTimeout(() => setFocus(field), 0); break; }
    }
  };

  // Autofocus first field when form mounts (after auth view appears)
  useEffect(() => {
    if (autoFocusFirstField) {
      setTimeout(() => setFocus('email'), 0);
    }
  }, [autoFocusFirstField, setFocus]);

  const onSubmit = async (data: LoginSchema) => {
    setServerError(null);
    const res = await login(data.email, data.password);
    if (!res.ok) {
      setServerError(res.message);
      return;
    }
    reset();
  };

  const onInvalid = () => focusFirstError();

  const disabled = isSubmitting || loading || !!user; // disable if already logged in

  return (
  <form className="space-y-5" aria-label="Login form" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
      {serverError && (
        <div role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
          {serverError}
        </div>
      )}
      <FormField
        id="login-email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <FormField
        id="login-password"
        type="password"
        label="Password"
        placeholder="••••••••"
        autoComplete="current-password"
        required
        error={errors.password?.message}
        {...register('password')}
      />
      <button
        type="submit"
        disabled={disabled || !isDirty || !isValid}
        className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {disabled ? 'Signing In…' : 'Sign In'}
      </button>
      <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
        Forgot your password? <span className="underline decoration-dotted">Reset (coming soon)</span>
      </div>
    </form>
  );
}
