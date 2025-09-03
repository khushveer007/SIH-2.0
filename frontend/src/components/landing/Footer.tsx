import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-neutral-800/70 py-16 text-sm" aria-labelledby="footer-heading">
      <div className="container">
        <h2 id="footer-heading" className="sr-only">Site Footer</h2>
        <div className="grid gap-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-semibold text-neutral-200 mb-3">About</h3>
            <p className="text-neutral-400 leading-relaxed max-w-xs">A guidance platform helping students map academic choices to meaningful career trajectories.</p>
          </div>
          <nav aria-label="Contact" className="space-y-3">
            <h3 className="font-semibold text-neutral-200 mb-1">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#support" className="text-neutral-400 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1">Support</a></li>
              <li><a href="mailto:info@example.com" className="text-neutral-400 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1">Email</a></li>
              <li><a href="#community" className="text-neutral-400 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1">Community</a></li>
            </ul>
          </nav>
          <nav aria-label="Social" className="space-y-3">
            <h3 className="font-semibold text-neutral-200 mb-1">Social</h3>
            <ul className="space-y-2">
              <li><a href="https://twitter.com" className="text-neutral-400 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1">Twitter</a></li>
              <li><a href="https://github.com" className="text-neutral-400 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1">GitHub</a></li>
              <li><a href="https://linkedin.com" className="text-neutral-400 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1">LinkedIn</a></li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 text-neutral-600 text-xs">© {new Date().getFullYear()} Future Pathways. All rights reserved.</div>
      </div>
    </footer>
  );
};
