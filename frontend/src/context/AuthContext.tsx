import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { fetchMe, loginUser, registerUser, clearToken, getToken, type UserInfo } from '@/lib/auth';

interface AuthContextValue {
  user: UserInfo | null;
  token: string | null;
  initializing: boolean; // hydration phase
  loading: boolean; // network op in progress
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  register: (email: string, password: string, username: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  // Hydrate on mount
  useEffect(() => {
    const t = getToken();
    if (!t) {
      setInitializing(false);
      return;
    }
    setToken(t);
    (async () => {
      const res = await fetchMe();
      if (res.ok) {
        setUser(res.user);
      } else {
        clearToken();
        setToken(null);
      }
      setInitializing(false);
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      if (!res.ok) return { ok: false, message: res.error.message } as const;
      setUser(res.data.user);
      setToken(res.data.token);
      return { ok: true } as const;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      const res = await registerUser({ email, password, username });
      if (!res.ok) return { ok: false, message: res.error.message } as const;
      // Auto-login after successful registration
      const loginRes = await login(email, password);
      if (!loginRes.ok) {
        return { ok: false, message: loginRes.message } as const;
      }
      return { ok: true } as const;
    } finally {
      setLoading(false);
    }
  }, [login]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setToken(null);
  }, []);

  const value: AuthContextValue = {
    user,
    token,
    initializing,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
