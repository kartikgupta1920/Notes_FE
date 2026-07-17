import React from 'react';
import { ChevronDownIcon } from '../Icons';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export default function Select({ label, options, id, className = '', ...props }: SelectProps) {
  return (
    <div className={`field ${className}`} style={{ width: 'auto', minWidth: 150 }}>
      <label htmlFor={id} className="field-label">{label}</label>
      <div className="select-wrap">
        <select id={id} className="select" {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDownIcon width={15} height={15} className="select-chevron" />
      </div>
    </div>
  );
}
