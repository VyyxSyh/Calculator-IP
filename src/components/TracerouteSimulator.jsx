import { useState, useRef } from 'react'
import { randomInt, randomPublicIp } from '../utils/ipUtils'
import { buttonFocusClass } from './SubnetCalculator'
import TerminalWindow from './TerminalWindow'

export default function TracerouteSimulator() {
  const [target, setTarget] = useState('example.com')
  const [hops, setHops] = useState([])
  const [running, setRunning] = useState(false)
  const timeouts = useRef([])

  function clearTimers() {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
  }

  function runTraceroute() {
    const trimmed = target.trim()
    if (trimmed === '') return

    clearTimers()
    setHops([])
    setRunning(true)

    const hopCount = randomInt(6, 13)
    // Latency generally increases with hop distance, with some jitter —
    // more realistic than pure random noise.
    let baseline = randomInt(2, 8)

    for (let i = 0; i < hopCount; i++) {
      const delay = 400 + i * 500
      const isLast = i === hopCount - 1
      const timedOut = !isLast && Math.random() < 0.08
      baseline += randomInt(2, 14)

      const t = setTimeout(() => {
        setHops((prev) => [
          ...prev,
          {
            hop: i + 1,
            ip: timedOut ? null : isLast ? resolveTargetIp(trimmed) : randomPublicIp(),
            hostname: timedOut ? null : isLast ? trimmed : maybeHostname(),
            time: timedOut ? null : Number((baseline + Math.random()).toFixed(1)),
          },
        ])
        if (isLast) setRunning(false)
      }, delay)
      timeouts.current.push(t)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Traceroute Simulator</h2>
        <p className="text-sm text-muted mt-1 max-w-2xl">
          Simulasi visual gaya terminal — hop, IP, dan waktu di bawah ini dibuat acak di sisi client, bukan
          hasil pengukuran jaringan sungguhan.
        </p>
      </div>

      <div className="bg-panel border border-line rounded p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !running && runTraceroute()}
            placeholder="IP atau hostname, misal 1.1.1.1"
            className="flex-1 font-mono text-sm border border-line rounded px-3 py-2 bg-white text-ink focus:outline-none focus:ring-2 focus:ring-signal-400 focus:border-signal-400"
          />
          <button
            onClick={runTraceroute}
            disabled={running || target.trim() === ''}
            className={`px-5 py-2 rounded bg-signal-500 text-white text-sm font-medium hover:bg-signal-600 disabled:opacity-40 disabled:cursor-not-allowed ${buttonFocusClass}`}
          >
            {running ? 'Melacak…' : 'Jalankan traceroute'}
          </button>
        </div>
      </div>

      <TerminalWindow title={`traceroute — ${target || 'target'}`}>
        {hops.length === 0 && !running && (
          <p className="text-term-dim">$ jalankan traceroute untuk melihat hasil simulasi</p>
        )}
        {hops.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-term-dim text-xs">
                  <th className="pb-2 pr-4 font-normal">Hop</th>
                  <th className="pb-2 pr-4 font-normal">IP</th>
                  <th className="pb-2 pr-4 font-normal">Hostname</th>
                  <th className="pb-2 font-normal">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {hops.map((h) => (
                  <tr key={h.hop} className="line-in">
                    <td className="py-1 pr-4 text-term-dim">{h.hop}</td>
                    <td className="py-1 pr-4">{h.ip ?? '* * *'}</td>
                    <td className="py-1 pr-4 text-term-dim">{h.hostname ?? '-'}</td>
                    <td className={'py-1 ' + (h.time === null ? 'text-term-warn' : 'text-term-accent')}>
                      {h.time === null ? 'timeout' : `${h.time} ms`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {running && <span className="inline-block w-2 h-4 bg-term-accent align-middle animate-pulse mt-2" />}
      </TerminalWindow>
    </div>
  )
}

function resolveTargetIp(target) {
  const asIp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
  if (asIp.test(target)) return target
  return randomPublicIp()
}

function maybeHostname() {
  if (Math.random() < 0.4) return null
  const isps = ['core', 'edge', 'border', 'transit', 'gw']
  const domains = ['net-provider.id', 'backbone.net', 'ix-jkt.net', 'upstream.net']
  return `${isps[randomInt(0, isps.length - 1)]}-${randomInt(1, 20)}.${
    domains[randomInt(0, domains.length - 1)]
  }`
}
