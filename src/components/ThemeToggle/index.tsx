import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '../Icons';

function getInitialTheme(): 'light' | 'dark' {
  const stored = window.localStorage.getItem('notes-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('notes-theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <MoonIcon width={17} height={17} /> : <SunIcon width={17} height={17} />}
    </button>
  );
}
