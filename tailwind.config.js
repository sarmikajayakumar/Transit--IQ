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
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        tamil: ['"Noto Sans Tamil"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.015em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.08em',
      }
    },
  },
  plugins: [],
}
