import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function FormField({ id, label, error, containerClassName, ...rest }: FormFieldProps) {
  return (
    <div className={containerClassName ?? 'space-y-2'}>
      <label htmlFor={id} className="text-sm font-medium flex items-center gap-1">
        {label}
        {rest.required && <span className="text-red-500" aria-hidden>*</span>}
      </label>
      <input
        id={id}
        className={`w-full rounded-md border bg-white dark:bg-neutral-900 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-neutral-300 dark:border-neutral-700 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
