import './App.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/components/landing/LandingPage';
import { useState } from 'react';
import { AuthLayout, LoginForm, RegisterForm } from '@/components/auth';
import { TestAlias } from '@/components/TestAlias';

function App() {
  const [authMode, setAuthMode] = useState<'none' | 'login' | 'register'>('none');
  const showingAuth = authMode !== 'none';

  return (
    <AppLayout>
      <div className="space-y-12">
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
            {authMode === 'login' ? <LoginForm /> : <RegisterForm />}
          </AuthLayout>
        ) : (
          <LandingPage />
        )}
        <div className="pt-8 border-t border-neutral-800/60">
          <h2 className="text-lg font-semibold tracking-tight mb-2">Alias Check Component</h2>
          <TestAlias />
        </div>
      </div>
    </AppLayout>
  );
}

export default App;

