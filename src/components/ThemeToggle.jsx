import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Ganti mode terang/gelap"
      className="relative w-14 h-8 rounded-full glass flex items-center px-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
    >
      <span
        className={
          'absolute top-1 left-1 w-6 h-6 rounded-full bg-accentSolid text-white flex items-center justify-center text-xs transition-transform duration-300 ease-smooth ' +
          (isDark ? 'translate-x-6' : 'translate-x-0')
        }
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
