import type { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-dvh flex flex-col bg-neutral-950 text-neutral-100 antialiased selection:bg-indigo-500/30">
      <Navbar />
      <main id="main-content" className="flex-1">
        <div className="container py-8 md:py-12">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
