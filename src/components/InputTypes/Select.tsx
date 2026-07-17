import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export default function Select({ label, options, id, className = '', ...props }: SelectProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-slate-700 whitespace-nowrap">
        {label}
      </label>
      <select
        id={id}
        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm bg-white cursor-pointer hover:border-slate-400"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}