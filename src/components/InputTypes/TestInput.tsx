import React from 'react';
import { AlertCircleIcon } from '../Icons';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function TextInput({ label, error, id, className = '', ...props }: TextInputProps) {
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id} className="field-label">{label}</label>
      <input
        id={id}
        className={`input ${error ? 'input-error' : ''}`}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <span className="field-error">
          <AlertCircleIcon width={13} height={13} /> {error}
        </span>
      )}
    </div>
  );
}
