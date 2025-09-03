import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(8, 'Confirm your password'),
  // Optional full name (deferred usage)
  name: z.string().trim().min(2, 'Name too short').max(80, 'Name too long').optional()
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Passwords do not match'
    });
  }
});

export type RegisterSchema = z.infer<typeof registerSchema>;
