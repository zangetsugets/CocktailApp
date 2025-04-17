'use client';

import { useTheme } from '../contexts/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-[var(--card-background)] 
                border border-[var(--input-border)] shadow-[var(--input-shadow)]
                hover:shadow-[var(--card-hover-shadow)] transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
