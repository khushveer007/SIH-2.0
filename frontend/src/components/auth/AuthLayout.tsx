import React from 'react';

interface AuthLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * AuthLayout
 * Lightweight wrapper for auth forms. Keeps consistent max-width, spacing and vertical centering.
 * Later we can replace this with a routed page container or modal wrapper without changing form internals.
 */
export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-[70vh] w-full flex items-start justify-center pt-16 md:pt-24">
      <div className="w-full max-w-sm space-y-6">
        {title && (
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
          </div>
        )}
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
          {children}
        </div>
        {footer && <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">{footer}</div>}
      </div>
    </div>
  );
}
