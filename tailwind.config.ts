/**
 * Tailwind CSS Configuration for Premium Gradient Framework
 */
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './sanity/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: 'var(--color-navy)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        'gold-dark': 'var(--color-gold-dark)',
        ivory: 'var(--color-ivory)',
        pearl: 'var(--color-pearl)',
        stone: 'var(--color-stone)',
        teal: 'var(--color-teal)',
        'teal-light': 'var(--color-teal-light)',
        'charcoal': 'var(--color-charcoal)',
        'slate': 'var(--color-slate)',
      },
      boxShadow: {
        gold: '0 4px 32px 0 rgba(212, 165, 165, 0.15)',
      },
      animation: {
        blob: 'blob 7s infinite',
        'delay-2000': 'blob 7s infinite 2s',
        'delay-4000': 'blob 7s infinite 4s',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '33%': { transform: 'translateY(-20px) scale(1.05)' },
          '66%': { transform: 'translateY(10px) scale(0.97)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
