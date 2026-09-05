import './hamburger.css'

export default function Hamburger({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
      aria-expanded={isOpen}
      className="p-2 rounded-full text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
    >
      <span className="hamburger-toggle" data-open={isOpen}>
        <span className="hamburger-bar hamburger-bar--top" />
        <span className="hamburger-bar hamburger-bar--middle" />
        <span className="hamburger-bar hamburger-bar--bottom" />
      </span>
    </button>
  )
}
