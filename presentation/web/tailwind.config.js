import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '4xs': [
          '0.5625rem', // 9px
          {
            lineHeight: '0.6875rem', // 11px
          },
        ],
        '3xs': [
          '0.625rem', // 10px
          {
            lineHeight: '0.75rem', // 12px
          },
        ],
        '2xs': [
          '0.6875rem', // 11px
          {
            lineHeight: '0.75rem', // 12px
          },
        ],
        '2sm': [
          '0.8125rem', // 13px
          {
            lineHeight: '1.125rem', // 18px
          },
        ],
        md: [
          '0.9375rem', // 15px
          {
            lineHeight: '1.375rem', // 22px
          },
        ],
        '1.5xl': [
          '1.375rem', // 22px
          {
            lineHeight: '1.8125rem', // 29px
          },
        ],
        '2.5xl': [
          '1.625rem', // 26px
          {
            lineHeight: '2.125rem', // 34px
          },
        ],
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            background: '#0d0e12',
          },
        },
      },
    }),
  ],
};
