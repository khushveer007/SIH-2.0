import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from './schemas';
import { FormField } from './FormField';

/**
 * LoginForm
 * Implements react-hook-form + zod validation for email/password.
 * Network integration occurs in subtask 7.3 (currently simulated).
 */
export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmittingSim, setIsSubmittingSim] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: LoginSchema) => {
    setServerError(null);
    // Simulation placeholder until real API integration (Task 7.3)
    setIsSubmittingSim(true);
    await new Promise(r => setTimeout(r, 650));
    // Mock failure path to exercise UI
    if (data.email.endsWith('@example.com')) {
      setServerError('Demo rejection: example.com emails are not allowed.');
    } else {
      // Will be replaced with token handling logic
      console.info('[Login simulated success]', data.email);
      reset();
    }
    setIsSubmittingSim(false);
  };

  const disabled = isSubmitting || isSubmittingSim;

  return (
    <form className="space-y-5" aria-label="Login form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        disabled={disabled}
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
