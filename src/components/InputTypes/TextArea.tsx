import React from 'react';
import { AlertCircleIcon } from '../Icons';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  maxLength?: number;
}

export default function TextArea({ label, error, id, className = '', maxLength, value, ...props }: TextAreaProps) {
  const count = typeof value === 'string' ? value.length : 0;
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id} className="field-label">
        <span>{label}</span>
        {maxLength && <span className="field-count">{count}/{maxLength}</span>}
      </label>
      <textarea
        id={id}
        className={`textarea ${error ? 'input-error' : ''}`}
        aria-invalid={!!error}
        maxLength={maxLength}
        value={value}
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
