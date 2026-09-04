export default function BitVisualizer({ octets, decimalOctets }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {octets.map((octetBits, idx) => (
        <div key={idx} className="border border-line rounded p-2.5 bg-paper">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-muted">Oktet {idx + 1}</span>
            {decimalOctets && (
              <span className="text-xs font-mono text-muted">{decimalOctets[idx]}</span>
            )}
          </div>
          <div className="flex font-mono text-sm gap-px">
            {octetBits.map((b, bitIdx) => (
              <span
                key={bitIdx}
                className={
                  'flex-1 text-center py-1 ' +
                  (b.isNetwork
                    ? 'bg-signal-500 text-white'
                    : 'bg-white text-ink border border-line')
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
          <span className="inline-block w-3 h-3 bg-signal-500 rounded-sm" /> bit network
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 bg-white border border-line rounded-sm" /> bit host
        </span>
      </div>
    </div>
  )
}
