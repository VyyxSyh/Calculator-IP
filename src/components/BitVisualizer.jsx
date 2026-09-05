export default function BitVisualizer({ octets, decimalOctets }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {octets.map((octetBits, idx) => (
        <div
          key={idx}
          className="rounded-2xl p-2.5 bg-surface/40 dark:bg-surface/30 border border-surfaceBorder/50 dark:border-surfaceBorder/10"
        >
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-muted">Oktet {idx + 1}</span>
            {decimalOctets && (
              <span className="text-xs font-mono text-muted">{decimalOctets[idx]}</span>
            )}
          </div>
          <div className="flex font-mono text-sm gap-1">
            {octetBits.map((b, bitIdx) => (
              <span
                key={bitIdx}
                className={
                  'flex-1 text-center py-1 rounded-md ' +
                  (b.isNetwork
                    ? 'bg-accentSolid text-white'
                    : 'bg-surface/70 dark:bg-surface/50 text-ink border border-surfaceBorder/40 dark:border-surfaceBorder/10')
                }
              >
                {b.bit}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="col-span-2 sm:col-span-4 flex items-center gap-4 text-xs text-muted pt-1">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 bg-accentSolid rounded-full" /> bit network
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 bg-surface/70 dark:bg-surface/50 border border-surfaceBorder/50 rounded-full" /> bit host
        </span>
      </div>
    </div>
  )
}
