import { useState, useMemo } from 'react'
import {
  parseIPv4,
  octetsToInt,
  isValidPrefix,
  maskStringToPrefix,
  calcSubnetInfo,
  binaryBreakdown,
  wildcardFromPrefix,
} from '../utils/ipUtils'
import BitVisualizer from './BitVisualizer'

export default function SubnetCalculator() {
  const [ipInput, setIpInput] = useState('192.168.1.10')
  const [maskMode, setMaskMode] = useState('prefix') // 'prefix' | 'mask'
  const [prefixInput, setPrefixInput] = useState('24')
  const [maskInput, setMaskInput] = useState('255.255.255.0')

  // IP and prefix/mask are validated independently so each error can be
  // shown directly under the field it belongs to, instead of one combined
  // message.
  const ipCheck = useMemo(() => parseIPv4(ipInput), [ipInput])

  const prefixCheck = useMemo(() => {
    if (maskMode === 'prefix') {
      const n = Number(prefixInput)
      if (!isValidPrefix(n)) return { valid: false, error: 'Prefix harus berupa angka bulat 0–32' }
      return { valid: true, prefix: n }
    }
    const maskParsed = maskStringToPrefix(maskInput)
    if (!maskParsed.valid) return { valid: false, error: maskParsed.error }
    return { valid: true, prefix: maskParsed.prefix }
  }, [maskMode, prefixInput, maskInput])

  const result = useMemo(() => {
    if (!ipCheck.valid || !prefixCheck.valid) return null
    const ipInt = octetsToInt(ipCheck.octets)
    const info = calcSubnetInfo(ipInt, prefixCheck.prefix)
    const bits = binaryBreakdown(ipInt, prefixCheck.prefix)
    return { info, bits }
  }, [ipCheck, prefixCheck])

  return (
    <div className="space-y-6">
      <ToolHeader
        title="Subnet Calculator"
        description="Masukkan alamat IP dan panjang prefix (atau subnet mask) untuk melihat rincian subnet secara lengkap."
      />

      <div className="bg-panel border border-line rounded p-5">
        <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-start">
          <Field label="Alamat IP" error={!ipCheck.valid ? ipCheck.error : null}>
            <input
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="192.168.1.10"
              className={inputClass}
            />
          </Field>

          <div className="flex gap-2 pt-[22px]">
            <ModeToggle mode={maskMode} onChange={setMaskMode} />
          </div>
        </div>

        <div className="mt-4">
          {maskMode === 'prefix' ? (
            <Field label="Prefix CIDR (/0–/32)" error={!prefixCheck.valid ? prefixCheck.error : null}>
              <div className="flex items-center gap-2 max-w-[160px]">
                <span className="font-mono text-muted">/</span>
                <input
                  value={prefixInput}
                  onChange={(e) => setPrefixInput(e.target.value)}
                  placeholder="24"
                  inputMode="numeric"
                  className={inputClass}
                />
              </div>
            </Field>
          ) : (
            <Field label="Subnet Mask" error={!prefixCheck.valid ? prefixCheck.error : null}>
              <input
                value={maskInput}
                onChange={(e) => setMaskInput(e.target.value)}
                placeholder="255.255.255.0"
                className={`${inputClass} max-w-[220px]`}
              />
            </Field>
          )}
        </div>
      </div>

      {result && (
        <>
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">Ringkasan</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <ResultCard label="Network address" value={`${result.info.network}/${result.info.prefix}`} />
              <ResultCard label="Broadcast address" value={result.info.broadcast} />
              <ResultCard label="Subnet mask" value={result.info.mask} />
              <ResultCard label="Wildcard mask" value={intAwareWildcard(result.info.prefix)} />
              <ResultCard
                label="Rentang host valid"
                value={
                  result.info.usableHosts > 0
                    ? `${result.info.firstHost} – ${result.info.lastHost}`
                    : '(tidak ada host valid)'
                }
                wide
              />
              <ResultCard label="Jumlah host valid" value={result.info.usableHosts.toLocaleString('id-ID')} />
              <ResultCard label="Kelas IP" value={result.info.ipClass} />
              <ResultCard label="Jenis alamat" value={result.info.isPrivate ? 'Private' : 'Public'} />
            </div>
          </div>

          <div className="bg-panel border border-line rounded p-5">
            <h3 className="text-sm font-semibold text-ink mb-4">Representasi biner</h3>
            <BitVisualizer octets={result.bits} decimalOctets={result.info.ip.split('.')} />
          </div>
        </>
      )}
    </div>
  )
}

function intAwareWildcard(prefix) {
  const w = wildcardFromPrefix(prefix)
  return [
    (w >>> 24) & 255,
    (w >>> 16) & 255,
    (w >>> 8) & 255,
    w & 255,
  ].join('.')
}

export function ToolHeader({ title, description }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="text-sm text-muted mt-1 max-w-2xl">{description}</p>
    </div>
  )
}

export function Field({ label, children, error }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-600 mt-1.5">{error}</span>}
    </label>
  )
}

// A single result in its own block — used by Subnet Calculator and CIDR
// Summarization so every field of a result reads as a distinct, scannable
// unit rather than one long list.
export function ResultCard({ label, value, wide }) {
  return (
    <div className={`border border-line rounded p-3 bg-panel ${wide ? 'col-span-2' : ''}`}>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-mono text-ink mt-1 break-all">{value}</p>
    </div>
  )
}

export function Row({ label, value }) {
  return (
    <div className="flex justify-between sm:justify-start sm:gap-3 border-b border-line py-1.5 sm:border-0 sm:py-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-mono text-ink text-right sm:text-left">{value}</dd>
    </div>
  )
}

export const inputClass =
  'w-full font-mono text-sm border border-line rounded px-3 py-2 bg-white text-ink focus:outline-none focus:ring-2 focus:ring-signal-400 focus:border-signal-400'

export const buttonFocusClass =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:ring-offset-1'

function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex border border-line rounded overflow-hidden h-fit">
      {[
        { id: 'prefix', label: 'CIDR' },
        { id: 'mask', label: 'Mask' },
      ].map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={
            'px-3 py-2 text-xs font-medium ' +
            buttonFocusClass +
            ' ' +
            (mode === opt.id ? 'bg-signal-500 text-white' : 'bg-white text-muted hover:bg-paper')
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
