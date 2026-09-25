// Renders stacked "label: oo.oo.oo.oo" rows in monospace so every column
// lines up vertically — mirrors how subnetting is worked out by hand on
// paper (IP / mask / result, one under another). Two row shapes:
//   - { label, bits: [8-char binary strings], highlightBits, operator, result, divider }
//   - { label, octets: [decimal/plain strings], result }
export default function AlignedBinary({ rows }) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-flex min-w-full flex-col gap-1.5 font-mono text-xs sm:text-sm">
        {rows.map((row, i) => (
          <div
            key={i}
            className={
              'flex items-center gap-3 ' +
              (row.divider ? 'pt-2 mt-1 border-t border-surfaceBorder/20' : '')
            }
          >
            <span className="w-7 shrink-0 text-center text-muted">{row.operator || ''}</span>
            <span className="w-24 sm:w-28 shrink-0 text-muted">{row.label}</span>
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
        ))}
      </div>
    </div>
  )
}