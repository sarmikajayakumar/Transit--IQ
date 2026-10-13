/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F6F3EC',
          200: '#EEE9DE',
          300: '#E2DBD0',
          400: '#C8BEAF',
          500: '#A99D8D',
          DEFAULT: '#F6F3EC',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          rich: '#111111',
          surface: '#1A1A1A',
          muted: '#6E6B65',
          border: '#262626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'monospace'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.18em',
      }
    },
  },
  plugins: [],
}
