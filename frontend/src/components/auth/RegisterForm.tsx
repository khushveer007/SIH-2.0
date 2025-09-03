import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchema } from './schemas';
import { FormField } from './FormField';
import { useAuth } from '@/context/AuthContext';

/**
 * RegisterForm
 * Adds confirm password + optional name field support (name hidden until product specifies usage).
 */
interface RegisterFormProps { autoFocusFirstField?: boolean }
export function RegisterForm({ autoFocusFirstField }: RegisterFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { register: registerAuth, loading } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting, isValid, isDirty }, reset, watch, setFocus } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });
  const passwordValue = watch('password');
  const focusFirstError = () => {
    const order: (keyof RegisterSchema)[] = ['username', 'email', 'password', 'confirmPassword'];
    for (const f of order) {
      if (errors[f]) { setTimeout(() => setFocus(f), 0); break; }
    }
  };

  useEffect(() => {
    if (autoFocusFirstField) {
      setTimeout(() => setFocus('username'), 0);
    }
  }, [autoFocusFirstField, setFocus]);

  const onSubmit = async (data: RegisterSchema) => {
    setServerError(null);
    const res = await registerAuth(data.email, data.password, data.username);
    if (!res.ok) {
      setServerError(res.message);
      return;
    }
    // Reset sensitive fields only
    reset({ email: '', password: '', confirmPassword: '', username: '', name: data.name });
  };
  const onInvalid = () => focusFirstError();

  const disabled = isSubmitting || loading;

  return (
  <form className="space-y-5" aria-label="Registration form" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
      {serverError && (
        <div role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
          {serverError}
        </div>
      )}
      <FormField
        id="register-username"
        type="text"
        label="Username"
        placeholder="your_handle"
        autoComplete="username"
        required
        error={errors.username?.message}
        {...register('username')}
      />
      {/* Optional full name (not yet surfaced in backend) */}
      {/* <FormField id="register-name" type="text" label="Full Name" placeholder="Jane Doe" autoComplete="name" error={errors.name?.message} {...register('name')} /> */}
      <FormField
        id="register-email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <FormField
        id="register-password"
        type="password"
        label="Password"
        placeholder="••••••••"
        autoComplete="new-password"
        required
        error={errors.password?.message}
        {...register('password')}
      />
      <FormField
        id="register-confirm-password"
        type="password"
        label="Confirm Password"
        placeholder="••••••••"
        autoComplete="new-password"
        required
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <div className="text-[11px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400" aria-live="polite">
        {passwordValue && passwordValue.length > 0 && !errors.password && passwordValue.length < 12 && (
          <span>Tip: Use 12+ characters for stronger security.</span>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled || !isDirty || !isValid}
        className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {disabled ? 'Creating Account…' : 'Create Account'}
      </button>
      <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
        Already have an account? <span className="underline decoration-dotted">Login (toggle above)</span>
      </div>
    </form>
  );
}
