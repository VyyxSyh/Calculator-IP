import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import Hamburger from './Hamburger'
import OctetLogo from './OctetLogo'
import { useTheme } from '../context/ThemeContext'

const TOOLS = [
  { id: 'subnet', label: 'Subnet Calculator', hint: 'IP + prefix → detail lengkap' },
  { id: 'vlsm', label: 'VLSM / Subnet Splitter', hint: 'Bagi satu network jadi banyak' },
  { id: 'cidr', label: 'CIDR Summarization', hint: 'Gabung beberapa network' },
]

const EASE = [0.22, 1, 0.36, 1]

export default function Sidebar({ active, onSelect }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile dropdown if the viewport grows into the desktop layout.
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function selectTool(id) {
    onSelect(id)
    setMobileOpen(false)
  }

  return (
    <>
      {/* ---------- Desktop sidebar ---------- */}
      <nav className="hidden md:flex md:flex-col md:w-64 shrink-0 md:sticky md:top-4 md:self-start md:max-h-[calc(100vh-2rem)] md:m-4 mr-0 glass rounded-3xl p-4">
        <div className="px-2 py-3 flex flex-col items-center text-center">
          <OctetLogo className="w-10 h-10" />
          <h1 className="font-sans text-xl font-extrabold text-ink mt-2">Octet</h1>
          <p className="text-sm text-muted mt-1">Kalkulator subnetting IPv4</p>
        </div>

        <ul className="flex flex-col gap-1 mt-2">
          {TOOLS.map((tool) => (
            <li key={tool.id} className="relative">
              {active === tool.id && (
                <motion.div
                  layoutId="desktop-active-indicator"
                  className="absolute inset-0 bg-accentTint rounded-2xl"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <button
                onClick={() => selectTool(tool.id)}
                className="relative z-10 w-full text-left px-4 py-3 rounded-2xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
              >
                <span className={'block text-sm font-semibold ' + (active === tool.id ? 'text-accent' : 'text-ink')}>
                  {tool.label}
                </span>
                <span className="block text-xs text-muted mt-0.5">{tool.hint}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 flex items-center justify-between px-2">
          <span className="text-xs text-muted">{theme === 'light' ? 'Light mode' : 'Dark mode'}</span>
          <ThemeToggle />
        </div>
      </nav>

      {/* ---------- Mobile / tablet navbar ---------- */}
      <header
        className={
          'md:hidden fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-smooth ' +
          (scrolled || mobileOpen ? 'glass rounded-b-3xl' : 'bg-transparent border-transparent shadow-none')
        }
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <OctetLogo className="w-7 h-7" />
            <h1 className="font-sans text-lg font-extrabold text-ink">Octet</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Hamburger isOpen={mobileOpen} onClick={() => setMobileOpen((o) => !o)} />
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden"
            >
              <ul className="flex flex-col gap-1 px-3 pb-3">
                {TOOLS.map((tool) => (
                  <li key={tool.id}>
                    <button
                      onClick={() => selectTool(tool.id)}
                      className={
                        'w-full text-left px-4 py-3 rounded-2xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
                        (active === tool.id ? 'bg-accentTint text-accent' : 'text-ink hover:bg-accentTint/50')
                      }
                    >
                      <span className="block text-sm font-semibold">{tool.label}</span>
                      <span className="block text-xs text-muted mt-0.5">{tool.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

export { TOOLS }
