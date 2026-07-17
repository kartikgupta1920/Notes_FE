import React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
});

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none" viewBox="0 0 24 24">
    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
  </svg>
);

export const PinOutlineIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
  </svg>
);

export const EditIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base(p)}><path d="M18 6 6 18M6 6l12 12" /></svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)} strokeWidth={3}><path d="M20 6 9 17l-5-5" /></svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base(p)}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>
);

export const LogOutIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

export const AlertTriangleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const AlertCircleIcon = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
);

export const EyeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.53 13.53 0 0 0 1 13s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61" />
    <path d="M1 1l22 22" />
  </svg>
);

export const SparklesIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none" viewBox="0 0 24 24">
    <path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z" />
    <path d="M19 15l.8 2.4L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.6L19 15Z" />
  </svg>
);

export const NotebookIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4Z" />
    <path d="M4 4v17M8 8h7M8 12h7M8 16h4" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5Z" /></svg>
);

export const ZapIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none" viewBox="0 0 24 24">
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
  </svg>
);

export const LayersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </svg>
);
