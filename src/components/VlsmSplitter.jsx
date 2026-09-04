import { useState, useMemo } from 'react'
import { parseIPv4, octetsToInt, isValidPrefix, vlsmAllocate, equalSplit } from '../utils/ipUtils'
import { ToolHeader, Field, inputClass, buttonFocusClass } from './SubnetCalculator'

export default function VlsmSplitter() {
  const [ipInput, setIpInput] = useState('192.168.1.0')
  const [prefixInput, setPrefixInput] = useState('24')
  const [mode, setMode] = useState('equal') // 'equal' | 'vlsm'
  const [equalCount, setEqualCount] = useState('4')
  const [hostRows, setHostRows] = useState([
    { id: 1, label: 'Subnet A', hosts: '50' },
    { id: 2, label: 'Subnet B', hosts: '20' },
    { id: 3, label: 'Subnet C', hosts: '10' },
  ])

  // IP and prefix validated independently so each error shows under its own
  // field rather than one combined message.
  const ipCheck = useMemo(() => parseIPv4(ipInput), [ipInput])
  const prefixCheck = useMemo(() => {
    const prefix = Number(prefixInput)
    if (!isValidPrefix(prefix)) return { valid: false, error: 'Prefix harus angka bulat 0–32' }
    return { valid: true, prefix }
  }, [prefixInput])

  const baseCheck = useMemo(() => {
    if (!ipCheck.valid || !prefixCheck.valid) return { error: 'input tidak valid' }
    return { networkInt: octetsToInt(ipCheck.octets), prefix: prefixCheck.prefix }
  }, [ipCheck, prefixCheck])

  const equalResult = useMemo(() => {
    if (mode !== 'equal' || baseCheck.error) return null
    const count = Number(equalCount)
    if (!Number.isInteger(count) || count <= 0) {
      return { error: 'Jumlah subnet harus bilangan bulat positif' }
    }
    return equalSplit(baseCheck.networkInt, baseCheck.prefix, count)
  }, [mode, baseCheck, equalCount])

  const vlsmResult = useMemo(() => {
    if (mode !== 'vlsm' || baseCheck.error) return null
    const hostsNumbers = hostRows.map((r) => Number(r.hosts))
    if (hostsNumbers.some((h) => !Number.isInteger(h) || h <= 0)) {
      return { error: 'Setiap baris harus punya jumlah host bulat positif' }
    }
    const allocations = vlsmAllocate(baseCheck.networkInt, baseCheck.prefix, hostsNumbers)
    return { allocations }
  }, [mode, baseCheck, hostRows])

  function addRow() {
    setHostRows((rows) => [
      ...rows,
      { id: Date.now(), label: `Subnet ${String.fromCharCode(65 + rows.length)}`, hosts: '' },
    ])
  }
  function removeRow(id) {
    setHostRows((rows) => rows.filter((r) => r.id !== id))
  }
  function updateRow(id, field, value) {
    setHostRows((rows) => rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  return (
    <div className="space-y-6">
      <ToolHeader
        title="VLSM / Subnet Splitter"
        description="Bagi satu network menjadi beberapa subnet — merata (equal split) atau sesuai kebutuhan jumlah host tiap subnet (VLSM)."
      />

      <div className="bg-panel border border-line rounded p-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Network address" error={!ipCheck.valid ? ipCheck.error : null}>
            <input value={ipInput} onChange={(e) => setIpInput(e.target.value)} className={inputClass} />
          </Field>
          <Field label="Prefix awal" error={!prefixCheck.valid ? prefixCheck.error : null}>
            <div className="flex items-center gap-2 max-w-[160px]">
              <span className="font-mono text-muted">/</span>
              <input
                value={prefixInput}
                onChange={(e) => setPrefixInput(e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </div>
          </Field>
        </div>
      </div>

      <div className="flex border border-line rounded overflow-hidden w-fit">
        {[
          { id: 'equal', label: 'Bagi rata (jumlah subnet)' },
          { id: 'vlsm', label: 'VLSM (kebutuhan host)' },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => setMode(opt.id)}
            className={
              'px-4 py-2 text-sm font-medium ' +
              buttonFocusClass +
              ' ' +
              (mode === opt.id ? 'bg-signal-500 text-white' : 'bg-white text-muted hover:bg-paper')
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {mode === 'equal' && (
        <div className="bg-panel border border-line rounded p-5">
          <Field label="Dibagi menjadi berapa subnet?">
            <input
              value={equalCount}
              onChange={(e) => setEqualCount(e.target.value)}
              inputMode="numeric"
              className={`${inputClass} max-w-[160px]`}
            />
          </Field>
        </div>
      )}

      {mode === 'vlsm' && (
        <div className="bg-panel border border-line rounded p-5 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-ink">Kebutuhan host per subnet</h3>
            <button
              onClick={addRow}
              className={`text-xs font-medium text-signal-600 border border-signal-500 rounded px-3 py-1.5 hover:bg-signal-50 ${buttonFocusClass}`}
            >
              + Tambah baris
            </button>
          </div>
          {hostRows.map((row) => (
            <div key={row.id} className="flex gap-2 items-center">
              <input
                value={row.label}
                onChange={(e) => updateRow(row.id, 'label', e.target.value)}
                className={`${inputClass} flex-1`}
                placeholder="Nama subnet"
              />
              <input
                value={row.hosts}
                onChange={(e) => updateRow(row.id, 'hosts', e.target.value)}
                inputMode="numeric"
                className={`${inputClass} w-28`}
                placeholder="Jumlah host"
              />
              <button
                onClick={() => removeRow(row.id)}
                disabled={hostRows.length <= 1}
                className={`text-muted hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed px-2 py-2 text-sm rounded ${buttonFocusClass}`}
                aria-label="Hapus baris"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {mode === 'equal' && equalResult?.error && (
        <p className="text-sm text-red-600">{equalResult.error}</p>
      )}
      {mode === 'equal' && equalResult?.subnets && (
        <ResultTable
          rows={equalResult.subnets.map((s, i) => ({
            label: `Subnet ${i + 1}`,
            ...s,
          }))}
        />
      )}

      {mode === 'vlsm' && vlsmResult?.error && <p className="text-sm text-red-600">{vlsmResult.error}</p>}
      {mode === 'vlsm' && vlsmResult?.allocations && (
        <ResultTable
          rows={vlsmResult.allocations.map((alloc, i) => ({
            label: hostRows[i]?.label || `Subnet ${i + 1}`,
            requested: hostRows[i]?.hosts,
            ...alloc,
          }))}
        />
      )}
    </div>
  )
}

function ResultTable({ rows }) {
  return (
    <div className="bg-panel border border-line rounded overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            <Th>Subnet</Th>
            <Th>Network</Th>
            <Th>Broadcast</Th>
            <Th>Rentang host</Th>
            <Th>Host valid</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              <Td className="text-ink font-medium">{row.label}</Td>
              {row.error ? (
                <td colSpan={4} className="px-4 py-2.5 text-red-600 font-mono text-xs">
                  {row.error}
                </td>
              ) : (
                <>
                  <Td mono>{`${row.network}/${row.prefix}`}</Td>
                  <Td mono>{row.broadcast}</Td>
                  <Td mono>
                    {row.usableHosts > 0 ? `${row.firstHost} – ${row.lastHost}` : '-'}
                  </Td>
                  <Td mono>{row.usableHosts.toLocaleString('id-ID')}</Td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Th({ children }) {
  return <th className="px-4 py-2.5 text-xs font-medium text-muted whitespace-nowrap">{children}</th>
}
function Td({ children, mono, className = '' }) {
  return (
    <td className={`px-4 py-2.5 whitespace-nowrap ${mono ? 'font-mono' : ''} ${className}`}>{children}</td>
  )
}
