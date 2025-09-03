import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '../../auth/schemas';

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('accepts valid payload', () => {
      const parsed = loginSchema.parse({ email: 'user@example.com', password: 'StrongPass123!' });
      expect(parsed.email).toBe('user@example.com');
    });
    it('rejects invalid email', () => {
      expect(() => loginSchema.parse({ email: 'bad', password: 'x'.repeat(8) })).toThrowError();
    });
    it('requires min password length', () => {
      expect(() => loginSchema.parse({ email: 'a@b.com', password: 'short' })).toThrowError();
    });
  });

  describe('registerSchema', () => {
    it('accepts valid registration', () => {
      const data = registerSchema.parse({
        username: 'valid_user',
        email: 'user@example.com',
        password: 'StrongPass123!',
        confirmPassword: 'StrongPass123!'
      });
      expect(data.username).toBe('valid_user');
    });
    it('rejects mismatched passwords', () => {
      expect(() => registerSchema.parse({
        username: 'valid_user',
        email: 'user@example.com',
        password: 'StrongPass123!',
        confirmPassword: 'Mismatch123!'
      })).toThrowError();
    });
    it('rejects short username', () => {
      expect(() => registerSchema.parse({
        username: 'ab',
        email: 'user@example.com',
        password: 'StrongPass123!',
        confirmPassword: 'StrongPass123!'
      })).toThrowError();
    });
  });
});
