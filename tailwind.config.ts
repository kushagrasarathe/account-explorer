import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        reown: {
          '1': '#e9e9e9',
          '2': '#ff573b',
          '3': '#ffb800',
          '4': '#0988f0',
          foreground: '#202020',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        grid: 'grid 15s linear infinite',
        meteor: 'meteor 5s linear infinite',
      },
      keyframes: {
        grid: {
          '0%': {
            transform: 'translateY(-50%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        meteor: {
          '0%': {
            transform: 'rotate(215deg) translateX(0)',
            opacity: '1',
          },
          '70%': {
            opacity: '1',
          },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-3d')],
};
export default config;
