import './App.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/components/landing/LandingPage';
import { useEffect, useRef, useState } from 'react';
import { AuthLayout, LoginForm, RegisterForm } from '@/components/auth';
import { TestAlias } from '@/components/TestAlias';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DashboardPlaceholder } from '@/components/placeholders/DashboardPlaceholder';

function AuthOrLanding() {
  const [authMode, setAuthMode] = useState<'none' | 'login' | 'register'>('none');
  const { user, logout, initializing } = useAuth();
  const showingAuth = authMode !== 'none';
  const viewAnnounceRef = useRef<HTMLDivElement | null>(null);

  // Listen for global auth-open events (e.g., from Navbar Sign In button)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { mode?: 'login' | 'register' } | undefined;
      if (detail?.mode === 'login' || detail?.mode === 'register') {
        setAuthMode(detail.mode);
      }
    };
    window.addEventListener('auth-open', handler as EventListener);
    return () => window.removeEventListener('auth-open', handler as EventListener);
  }, []);

  // Announce view changes & focus first field when switching to auth
  useEffect(() => {
    if (!showingAuth) return;
    const label = authMode === 'login' ? 'Sign In form loaded' : 'Registration form loaded';
    if (viewAnnounceRef.current) {
      viewAnnounceRef.current.textContent = label;
    }
    // attempt focus after paint
    // Field focus handled inside individual form components via autoFocusFirstField prop
  }, [showingAuth, authMode]);

  if (initializing) {
    return <div className="p-10 text-sm opacity-70">Checking session…</div>;
  }

  if (user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pt-4">
          <h1 className="text-lg font-semibold tracking-tight">Welcome, <span className="text-indigo-400">{user.username}</span></h1>
          <button onClick={logout} className="text-xs underline decoration-dotted">Logout</button>
        </div>
        <DashboardPlaceholder />
      </div>
    );
  }

  // Deep-link support via hash (#login or #register)
  if (typeof window !== 'undefined') {
    const hash = window.location.hash;
    if (authMode === 'none' && (hash === '#login' || hash === '#register')) {
      // set state asynchronously to avoid render loop
      setTimeout(() => setAuthMode(hash === '#login' ? 'login' : 'register'), 0);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center justify-end text-xs pt-4">
        <span className="opacity-60">Dev Auth Preview:</span>
        <button
          onClick={() => setAuthMode(m => (m === 'login' ? 'none' : 'login'))}
          className={`px-3 py-1 rounded-md border text-[11px] tracking-wide transition ${authMode === 'login' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-neutral-600 hover:bg-neutral-800'}`}
        >{authMode === 'login' ? 'Hide Login' : 'Show Login'}</button>
        <button
          onClick={() => setAuthMode(m => (m === 'register' ? 'none' : 'register'))}
          className={`px-3 py-1 rounded-md border text-[11px] tracking-wide transition ${authMode === 'register' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-neutral-600 hover:bg-neutral-800'}`}
        >{authMode === 'register' ? 'Hide Register' : 'Show Register'}</button>
      </div>
      <div
        ref={viewAnnounceRef}
        aria-live="polite"
        className="sr-only"
      />
      {showingAuth ? (
        <AuthLayout
          title={authMode === 'login' ? 'Sign In' : 'Create Account'}
          subtitle={authMode === 'login' ? 'Access your dashboard' : 'Start your journey'}
          footer={
            <button
              className="underline decoration-dotted"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            >
              {authMode === 'login' ? 'Need an account? Register' : 'Have an account? Sign in'}
            </button>
          }
        >
          {authMode === 'login'
            ? <LoginForm autoFocusFirstField />
            : <RegisterForm autoFocusFirstField />}
        </AuthLayout>
      ) : (
        <LandingPage
          onShowLogin={() => setAuthMode('login')}
            onShowRegister={() => setAuthMode('register')}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppLayout>
        <div className="space-y-12">
          <AuthOrLanding />
          <div className="pt-8 border-t border-neutral-800/60">
            <h2 className="text-lg font-semibold tracking-tight mb-2">Alias Check Component</h2>
            <TestAlias />
          </div>
        </div>
      </AppLayout>
    </AuthProvider>
  );
}

export default App;

