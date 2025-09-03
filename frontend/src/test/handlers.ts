import { http, HttpResponse } from 'msw';

interface UserRecord {
  id: string;
  email: string;
  username: string;
  password: string; // plain for test-only
  role?: string;
}

// In-memory stores for test simulation
const users: UserRecord[] = [
  { id: 'u1', email: 'existing@example.com', username: 'existing', password: 'Password123' }
];
const tokenToUserId = new Map<string, string>();

function issueToken(user: UserRecord) {
  const token = `token-${user.id}`;
  tokenToUserId.set(token, user.id);
  return token;
}

function jsonError(message: string, status: number) {
  return HttpResponse.json({ error: { message, status } }, { status });
}

export const handlers = [
  // Login handler
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json().catch(() => ({} as any));
    const { email, password } = body as { email?: string; password?: string };
    if (!email || !password) return jsonError('Missing credentials', 400);
    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) return jsonError('Invalid email or password', 401);
    const token = issueToken(user);
    return HttpResponse.json({ user: { id: user.id, email: user.email, username: user.username }, token });
  }),
  // Register handler
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json().catch(() => ({} as any));
    const { email, password, username } = body as { email?: string; password?: string; username?: string };
    if (!email || !password || !username) return jsonError('Missing fields', 400);
    if (users.some(u => u.email === email)) return jsonError('Email already registered', 409);
    if (users.some(u => u.username === username)) return jsonError('Username taken', 409);
    const newUser: UserRecord = { id: `u${users.length + 1}`, email, username, password };
    users.push(newUser);
    return HttpResponse.json({ user: { id: newUser.id, email: newUser.email, username: newUser.username } }, { status: 201 });
  }),
  // Fetch current user
  http.get('/api/auth/me', async ({ request }) => {
    const auth = request.headers.get('authorization');
    // eslint-disable-next-line no-console
    console.log('[MSW] /api/auth/me called, auth header:', auth);
    if (!auth) return jsonError('No token', 401);
    const token = auth.replace('Bearer ', '');
    // eslint-disable-next-line no-console
    console.log('[MSW] token:', token, 'tokenToUserId:', Array.from(tokenToUserId.entries()));
    const userId = tokenToUserId.get(token);
    if (!userId) return jsonError('Invalid token', 401);
    const user = users.find(u => u.id === userId);
    if (!user) return jsonError('User not found', 404);
    return HttpResponse.json({ user: { id: user.id, email: user.email, username: user.username } });
  })
];

// Test utilities to help manipulate server state from tests if needed later
export const __internal = {
  users,
  tokenToUserId
};
