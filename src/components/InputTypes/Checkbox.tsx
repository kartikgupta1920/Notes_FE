import React from 'react';
import { CheckIcon } from '../Icons';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export default function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className={`checkbox-row ${className}`}>
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <input id={id} type="checkbox" className="checkbox-input" {...props} />
        <span className="checkbox-box"><CheckIcon /></span>
      </span>
      <span className="checkbox-label">{label}</span>
    </label>
  );
}
