const TOOLS = [
  { id: 'subnet', label: 'Subnet Calculator', hint: 'IP + prefix → detail lengkap' },
  { id: 'vlsm', label: 'VLSM / Subnet Splitter', hint: 'Bagi satu network jadi banyak' },
  { id: 'cidr', label: 'CIDR Summarization', hint: 'Gabung beberapa network' },
]

export default function Sidebar({ active, onSelect }) {
  return (
    <nav className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-line bg-panel">
      <div className="px-5 py-5 hidden md:block">
        <p className="font-mono text-sm text-signal-500 tracking-tight">10101100.00010000</p>
        <h1 className="font-sans text-lg font-semibold text-ink mt-1">IP Network Toolkit</h1>
        <p className="text-sm text-muted mt-1">Kalkulator subnetting IPv4</p>
      </div>

      {/* Mobile: horizontal scrollable tabs. Desktop: vertical list. */}
      <ul className="flex md:flex-col overflow-x-auto md:overflow-visible px-3 md:px-3 py-2 md:py-2 gap-1">
        {TOOLS.map((tool) => {
          const isActive = tool.id === active
          return (
            <li key={tool.id} className="shrink-0 md:shrink">
              <button
                onClick={() => onSelect(tool.id)}
                className={
                  'w-full text-left px-3 py-2.5 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:ring-offset-1 ' +
                  (isActive
                    ? 'bg-signal-50 text-signal-600'
                    : 'text-ink hover:bg-paper')
                }
              >
                <span className="block text-sm font-medium">{tool.label}</span>
                <span className="hidden md:block text-xs text-muted mt-0.5">{tool.hint}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { TOOLS }
