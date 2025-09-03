import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './server';

// Start MSW before all tests & close after
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// Polyfill fetch if needed (jsdom 25 includes fetch globally but keep guard)
if (typeof globalThis.fetch === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // @ts-ignore
  globalThis.fetch = (...args) => import('node-fetch').then(m => (m.default as any)(...args));
}

// Utility: silence expected console errors during tests (can be expanded later)
const originalError = console.error;
console.error = (...args: any[]) => {
  if (/Warning:.*not wrapped in act/.test(args[0])) return;
  originalError(...args);
};

// Expose a helper for delaying (await wait(ms))
export const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

