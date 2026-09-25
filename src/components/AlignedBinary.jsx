// Renders stacked "label: oo.oo.oo.oo" rows in monospace so every column
// lines up vertically — mirrors how subnetting is worked out by hand on
// paper (IP / mask / result, one under another).
//
// Mobile (< sm): label di atas, value di bawah (vertical stack) — ga overflow.
// Desktop (>= sm): layout horizontal kayak sekarang, label & value sejajar.
//
// Two row shapes:
//   - { label, bits: [8-char binary strings], highlightBits, operator, result, divider }
//   - { label, octets: [decimal/plain strings], result }
export default function AlignedBinary({ rows }) {
  return (
    <div className="font-mono text-xs sm:text-sm space-y-3 sm:space-y-1.5">
      {rows.map((row, i) => (
        <div
          key={i}
          className={
            (row.divider ? 'pt-3 sm:pt-2 mt-1 border-t border-surfaceBorder/20' : '')
          }
        >
          {/* Mobile: vertical stack */}
          <div className="sm:hidden">
            <div className="flex items-center gap-2 mb-1">
              {row.operator && (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold">
                  {row.operator}
                </span>
              )}
              <span className="text-muted text-xs font-sans font-semibold">{row.label}</span>
            </div>
            <div className={'pl-8 ' + (row.result ? 'text-accent font-bold' : 'text-ink')}>
              {row.bits
                ? row.bits.map((octetBits, oi) => (
                    <span key={oi} className="inline-flex items-center">
                      {oi > 0 && <span className="text-muted mx-0.5">.</span>}
                      <span className="inline-flex">
                        {octetBits.split('').map((bit, bi) => {
                          const globalIdx = oi * 8 + bi
                          const highlighted = row.highlightBits != null && globalIdx < row.highlightBits
                          return (
                            <span key={bi} className={highlighted ? 'text-accent' : ''}>
                              {bit}
                            </span>
                          )
                        })}
                      </span>
                    </span>
                  ))
                : row.octets.map((v, oi) => (
                    <span key={oi} className="inline-flex items-center">
                      {oi > 0 && <span className="text-muted mx-0.5">.</span>}
                      <span>{v}</span>
                    </span>
                  ))}
            </div>
          </div>

          {/* Desktop: horizontal layout */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="w-7 shrink-0 text-center text-muted">{row.operator || ''}</span>
            <span className="w-28 shrink-0 text-muted">{row.label}</span>
            <span className={'flex items-center gap-1.5 ' + (row.result ? 'text-accent font-bold' : 'text-ink')}>
              {row.bits
                ? row.bits.map((octetBits, oi) => (
                    <span key={oi} className="flex items-center">
                      {oi > 0 && <span className="text-muted mx-1">.</span>}
                      <span className="flex">
                        {octetBits.split('').map((bit, bi) => {
                          const globalIdx = oi * 8 + bi
                          const highlighted = row.highlightBits != null && globalIdx < row.highlightBits
                          return (
                            <span key={bi} className={highlighted ? 'text-accent' : ''}>
                              {bit}
                            </span>
                          )
                        })}
                      </span>
                    </span>
                  ))
                : row.octets.map((v, oi) => (
                    <span key={oi} className="flex items-center">
                      {oi > 0 && <span className="text-muted mx-1">.</span>}
                      <span>{v}</span>
                    </span>
                  ))}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
