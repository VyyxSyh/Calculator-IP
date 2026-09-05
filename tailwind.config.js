/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Rounded, friendly sans-serif for headings/labels/body text
        sans: ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Monospace for every technical value: IPs, masks, binary, numbers
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // All colors resolve through CSS variables (see index.css) so a
        // single `.dark` class toggle re-themes the whole app — no need to
        // sprinkle `dark:` on every element.
        base: 'rgb(var(--bg-base) / <alpha-value>)',
        ink: 'rgb(var(--text-primary) / <alpha-value>)',
        muted: 'rgb(var(--text-secondary) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surfaceBorder: 'rgb(var(--surface-border) / <alpha-value>)',
        // Primary accent (blue/teal) — used for text, links, active icons.
        // Brightness is tuned per-theme in index.css for contrast.
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentTint: 'rgb(var(--accent-tint) / <alpha-value>)',
        // Fixed-tone accent for solid buttons / filled highlights, kept
        // identical across themes so it always contrasts white text.
        accentSolid: 'rgb(var(--accent-solid) / <alpha-value>)',
      },
      boxShadow: {
        glass: '0 8px 30px rgb(15 23 42 / 0.07)',
        'glass-dark': '0 8px 30px rgb(0 0 0 / 0.35)',
        'glass-sm': '0 4px 16px rgb(15 23 42 / 0.06)',
      },
      backdropBlur: {
        glass: '16px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
