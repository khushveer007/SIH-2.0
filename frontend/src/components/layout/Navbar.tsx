import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from './DarkModeToggle';
import { Menu, X } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'About', href: '#about' },
];

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#" className="font-semibold tracking-tight text-indigo-400 hover:text-indigo-300 transition-colors">Pathfinder</a>
          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Main">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-neutral-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <Button size="sm" className="hidden md:inline-flex">Sign In</Button>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <FadeIn y={-4} className="md:hidden border-t border-neutral-800/80 bg-neutral-950/90 backdrop-blur">
          <div className="container py-4 flex flex-col gap-4 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-neutral-300 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="outline" className="w-full" size="sm">Sign In</Button>
          </div>
        </FadeIn>
      )}
    </header>
  );
};
