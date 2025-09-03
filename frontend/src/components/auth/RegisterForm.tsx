import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchema } from './schemas';
import { FormField } from './FormField';

/**
 * RegisterForm
 * Adds confirm password + optional name field support (name hidden until product specifies usage).
 */
export function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmittingSim, setIsSubmittingSim] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: RegisterSchema) => {
    setServerError(null);
    setIsSubmittingSim(true);
    await new Promise(r => setTimeout(r, 750));
    if (data.email.endsWith('@example.com')) {
      setServerError('Demo rejection: example.com emails are reserved.');
    } else {
      console.info('[Register simulated success]', data.email);
      reset({ email: '', password: '', confirmPassword: '', name: data.name });
    }
    setIsSubmittingSim(false);
  };

  const disabled = isSubmitting || isSubmittingSim;

  return (
    <form className="space-y-5" aria-label="Registration form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && (
        <div role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
          {serverError}
        </div>
      )}
      {/* Name field reserved; uncomment when required */}
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
      <button
        type="submit"
        disabled={disabled}
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
