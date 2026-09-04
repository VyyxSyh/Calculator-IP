/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Neutral base — soft paper background, not pure white/black
        paper: '#F7F7F4',
        panel: '#FFFFFF',
        ink: '#1A2332',
        muted: '#6B7280',
        line: '#E3E4E0',
        // Single accent used for network bits, active states, primary actions
        signal: {
          DEFAULT: '#146356',
          50: '#EAF3F1',
          100: '#D2E6E1',
          400: '#1C8874',
          500: '#146356',
          600: '#0F4D43',
        },
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
}
