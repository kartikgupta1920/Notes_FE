import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function TextInput({ label, error, id, className = '', ...props }: TextInputProps) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-200
          ${error 
            ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-red-50/30' 
            : 'border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white hover:border-slate-400'
          }
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1.5 font-medium">{error}</span>}
    </div>
  );
}