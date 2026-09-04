import { useState, useRef } from 'react'
import { randomInt } from '../utils/ipUtils'
import { buttonFocusClass } from './SubnetCalculator'
import TerminalWindow from './TerminalWindow'

const PACKET_COUNT = 4

export default function PingSimulator() {
  const [target, setTarget] = useState('google.com')
  const [lines, setLines] = useState([])
  const [running, setRunning] = useState(false)
  const [stats, setStats] = useState(null)
  const timeouts = useRef([])

  function clearTimers() {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
  }

  function runPing() {
    const trimmed = target.trim()
    if (trimmed === '') return

    clearTimers()
    setLines([])
    setStats(null)
    setRunning(true)

    const resolvedIp = `${randomInt(20, 220)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`
    const times = []
    // ~5% chance a given packet times out, for realism
    const results = Array.from({ length: PACKET_COUNT }, () => {
      const lost = Math.random() < 0.05
      return lost ? null : Number((randomInt(8, 65) + Math.random()).toFixed(1))
    })

    const header = `PING ${trimmed} (${resolvedIp}): 56 data bytes`
    pushLine(header, 0)

    results.forEach((time, i) => {
      const delay = 350 + i * 550
      pushLine(
        time === null
          ? `Request timeout for icmp_seq ${i}`
          : `64 bytes from ${resolvedIp}: icmp_seq=${i} ttl=${randomInt(50, 64)} time=${time} ms`,
        delay
      )
      if (time !== null) times.push(time)
    })

    const finalDelay = 350 + PACKET_COUNT * 550 + 300
    const t = setTimeout(() => {
      const received = times.length
      const lossPct = Math.round(((PACKET_COUNT - received) / PACKET_COUNT) * 100)
      const avg = received > 0 ? (times.reduce((a, b) => a + b, 0) / received).toFixed(1) : null
      const min = received > 0 ? Math.min(...times).toFixed(1) : null
      const max = received > 0 ? Math.max(...times).toFixed(1) : null

      setLines((prev) => [
        ...prev,
        '',
        `--- ${trimmed} ping statistics ---`,
        `${PACKET_COUNT} packets transmitted, ${received} packets received, ${lossPct}% packet loss`,
      ])
      if (avg !== null) {
        setStats({ min, avg, max, lossPct })
      } else {
        setStats({ lossPct })
      }
      setRunning(false)
    }, finalDelay)
    timeouts.current.push(t)
  }

  function pushLine(text, delay) {
    const t = setTimeout(() => {
      setLines((prev) => [...prev, text])
    }, delay)
    timeouts.current.push(t)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Ping Simulator</h2>
        <p className="text-sm text-muted mt-1 max-w-2xl">
          Simulasi visual gaya terminal — tidak melakukan request jaringan sungguhan. Browser tidak bisa
          mengirim ICMP echo langsung, jadi waktu &amp; hasil di bawah ini acak untuk keperluan edukasi.
        </p>
      </div>

      <div className="bg-panel border border-line rounded p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !running && runPing()}
            placeholder="IP atau hostname, misal 8.8.8.8"
            className="flex-1 font-mono text-sm border border-line rounded px-3 py-2 bg-white text-ink focus:outline-none focus:ring-2 focus:ring-signal-400 focus:border-signal-400"
          />
          <button
            onClick={runPing}
            disabled={running || target.trim() === ''}
            className={`px-5 py-2 rounded bg-signal-500 text-white text-sm font-medium hover:bg-signal-600 disabled:opacity-40 disabled:cursor-not-allowed ${buttonFocusClass}`}
          >
            {running ? 'Ping berjalan…' : 'Jalankan ping'}
          </button>
        </div>
      </div>

      <TerminalWindow title={`ping — ${target || 'target'}`}>
        {lines.length === 0 && !running && (
          <p className="text-term-dim">$ jalankan ping untuk melihat hasil simulasi</p>
        )}
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              'line-in whitespace-pre-wrap ' +
              (line.includes('timeout') ? 'text-term-warn' : '')
            }
          >
            {line || '\u00A0'}
          </p>
        ))}
        {running && <span className="inline-block w-2 h-4 bg-term-accent align-middle animate-pulse" />}
      </TerminalWindow>

      {stats && (
        <div className="bg-panel border border-line rounded p-5">
          <h3 className="text-sm font-semibold text-ink mb-4">Statistik round-trip</h3>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBox label="Packet loss" value={`${stats.lossPct}%`} />
            <StatBox label="Min" value={stats.min ? `${stats.min} ms` : '-'} />
            <StatBox label="Rata-rata" value={stats.avg ? `${stats.avg} ms` : '-'} />
            <StatBox label="Max" value={stats.max ? `${stats.max} ms` : '-'} />
          </dl>
        </div>
      )}
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div className="border border-line rounded p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-mono text-lg text-ink mt-1">{value}</p>
    </div>
  )
}
