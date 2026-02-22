import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      fontSize: {
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'lead': ['1.125rem', { lineHeight: '1.65' }],
        'logo-abbr': ['1.375rem', { lineHeight: '1.15' }],
        'logo-name': ['0.65625rem', { lineHeight: '1.4' }],
        'nav': ['0.875rem', { lineHeight: '1.4' }],
        'hero-title': ['clamp(2rem, 5vw, 3.625rem)', { lineHeight: '1.2' }],
      },
      colors: {
        navy: '#1B2E4B',
        'navy-deep': '#0F1E32',
        'navy-mid': '#243a5e',
        gold: '#C9A227',
        'gold-light': '#E8C04A',
        'gold-pale': '#F5E9C0',
        'off-white': '#F8F6F1',
        'text-muted': '#5a6a7e',
        border: '#dde3ed',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        geologica: ['Geologica', 'sans-serif'],
      },
      transitionDuration: {
        DEFAULT: '280ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '100': '100px',
      },
      boxShadow: {
        header: '0 2px 20px rgba(27,46,75,0.08)',
        mega: '0 20px 60px rgba(15,30,50,0.35)',
        gold: '0 4px 12px rgba(201,162,39,0.35)',
        'gold-lg': '0 8px 24px rgba(201,162,39,0.4)',
      },
      keyframes: {
        slowZoom: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.06)' },
        },
      },
      animation: {
        slowZoom: 'slowZoom 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
} satisfies Config
