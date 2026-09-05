import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  parseIPv4,
  octetsToInt,
  isValidPrefix,
  maskStringToPrefix,
  calcSubnetInfo,
  binaryBreakdown,
  wildcardFromPrefix,
  ipStringToBinary,
} from '../utils/ipUtils'
import { useCanHover } from '../hooks/useCanHover'
import BitVisualizer from './BitVisualizer'

const EASE = [0.22, 1, 0.36, 1]

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

      <div className="glass rounded-3xl p-5">
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
            <h3 className="text-sm font-semibold text-ink mb-3">
              Ringkasan
              <span className="hidden lg:inline text-xs font-normal text-muted ml-2">
                (arahkan kursor ke kartu untuk lihat biner)
              </span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <ResultCard
                label="Network address"
                value={`${result.info.network}/${result.info.prefix}`}
                binaryOf={result.info.network}
              />
              <ResultCard label="Broadcast address" value={result.info.broadcast} binaryOf={result.info.broadcast} />
              <ResultCard label="Subnet mask" value={result.info.mask} binaryOf={result.info.mask} />
              <ResultCard
                label="Wildcard mask"
                value={intAwareWildcard(result.info.prefix)}
                binaryOf={intAwareWildcard(result.info.prefix)}
              />
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

          <div className="glass rounded-3xl p-5">
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
      <h2 className="text-2xl font-extrabold text-ink">{title}</h2>
      <p className="text-sm text-muted mt-1 max-w-2xl">{description}</p>
    </div>
  )
}

export function Field({ label, children, error }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-muted mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-500 mt-1.5">{error}</span>}
    </label>
  )
}

// A single result in its own block — used by Subnet Calculator and CIDR
// Summarization so every field of a result reads as a distinct, scannable
// unit. When `binaryOf` is a valid IPv4 string, hovering the card (desktop
// only — gated by useCanHover) reveals its binary form in a small popup.
// The popup fades/scales in smoothly but exits noticeably faster, and its
// text is unselectable so it reads as a reference, not a copy source.
export function ResultCard({ label, value, wide, binaryOf }) {
  const canHover = useCanHover()
  const [hovered, setHovered] = useState(false)
  const binary = binaryOf ? ipStringToBinary(binaryOf) : null
  const showPopup = canHover && !!binary && hovered

  return (
    <div
      className={`relative rounded-2xl p-3 bg-surface/40 dark:bg-surface/30 border border-surfaceBorder/50 dark:border-surfaceBorder/10 transition-colors ${wide ? 'col-span-2' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-mono text-ink mt-1 break-all">{value}</p>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="select-none absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 whitespace-nowrap px-3 py-2 rounded-xl bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900 text-xs font-mono shadow-glass"
          >
            {binary}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Enter is a touch slower/softer than exit — exit should feel snappier so
// the popup doesn't linger once the pointer has moved on.
const popupVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.96, transition: { duration: 0.12, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: EASE } },
}

export function Row({ label, value }) {
  return (
    <div className="flex justify-between sm:justify-start sm:gap-3 border-b border-surfaceBorder/40 py-1.5 sm:border-0 sm:py-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-mono text-ink text-right sm:text-left">{value}</dd>
    </div>
  )
}

export const inputClass =
  'w-full font-mono text-sm rounded-xl px-4 py-2.5 bg-surface/60 dark:bg-surface/40 border border-surfaceBorder/50 dark:border-surfaceBorder/10 text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-shadow'

export const buttonFocusClass =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base'

function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex rounded-full bg-surface/60 dark:bg-surface/40 border border-surfaceBorder/50 dark:border-surfaceBorder/10 p-1 h-fit">
      {[
        { id: 'prefix', label: 'CIDR' },
        { id: 'mask', label: 'Mask' },
      ].map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={
            'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ' +
            buttonFocusClass +
            ' ' +
            (mode === opt.id ? 'bg-accentSolid text-white' : 'text-muted hover:text-ink')
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
