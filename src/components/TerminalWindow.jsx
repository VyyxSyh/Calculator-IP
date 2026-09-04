// Lightweight "terminal window" mock: a title bar with traffic-light dots
// over a dark, monospace content area. Shared by Ping and Traceroute so
// both simulators read as the same kind of window.
export default function TerminalWindow({ title, children }) {
  return (
    <div className="border border-term-line rounded overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-term-panel border-b border-term-line">
        <span className="w-2.5 h-2.5 rounded-full bg-term-line" />
        <span className="w-2.5 h-2.5 rounded-full bg-term-line" />
        <span className="w-2.5 h-2.5 rounded-full bg-term-line" />
        <span className="ml-3 text-xs text-term-dim font-mono">{title}</span>
      </div>
      <div className="bg-term-bg p-5 font-mono text-sm text-term-text min-h-[220px]">{children}</div>
    </div>
  )
}
