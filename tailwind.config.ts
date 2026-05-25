import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaf1ff',
          100: '#c9dbff',
          200: '#a6c3ff',
          300: '#7fa9ff',
          400: '#5c93ff',
          500: '#285CCC', // your main blue
          600: '#204bb3',
          700: '#193a8c',
          800: '#122a66',
          900: '#0b1a40',
          950: '#070f26',
        },

        secondary: {
          50: '#fffdf0',
          100: '#fff9cc',
          200: '#fff3a3',
          300: '#ffec78',
          400: '#ffe44f',
          500: '#FFF2BD', // your butter milk base
          600: '#e6d89a',
          700: '#b8ab76',
          800: '#8a7f55',
          900: '#5c5536',
          950: '#2e2a1a',
        },
      },
    },
  },

  plugins: [],
};

export default config;