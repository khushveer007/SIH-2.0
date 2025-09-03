import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/components/utils/cn';

export const DarkModeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark, mounted]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-700/70 bg-neutral-800/40 hover:bg-neutral-700/60 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
      )}
      aria-label={dark ? 'Activate light mode' : 'Activate dark mode'}
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};
