import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ELION brand palette
        space: {
          950: '#050810',
          900: '#0B1320',
          800: '#111d30',
          700: '#1a2a42',
          600: '#243550',
        },
        silver: {
          100: '#f0f3f7',
          200: '#dce3ed',
          300: '#b7c2cf',
          400: '#9aa7b5',
          500: '#7a8a99',
        },
        gold: {
          300: '#f0d080',
          400: '#e0b85f',
          500: '#c99a3a',
        },
        elion: {
          blue: '#4a7fa5',
          'blue-light': '#6fa3c8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'orbit-slow': 'orbit 20s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'star-field': "url('/images/star-field.svg')",
      },
    },
  },
  plugins: [],
}

export default config
