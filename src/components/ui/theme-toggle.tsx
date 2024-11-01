'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { ButtonIcon } from './button-icon';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <ButtonIcon
      onClick={handleThemeChange}
      icon={theme === 'dark' ? Sun : Moon}
      variant={'reown-2'}
    >
      <span className="sr-only">Toggle theme</span>
    </ButtonIcon>
  );
}
