import { useState, useMemo } from 'react'
import { parseIPv4, octetsToInt, isValidPrefix, summarizeCidr, calcSubnetInfo } from '../utils/ipUtils'
import { ToolHeader, Field, ResultCard, inputClass } from './SubnetCalculator'

const DEFAULT_INPUT = '192.168.0.0/24\n192.168.1.0/24\n192.168.2.0/24\n192.168.3.0/24'

export default function CidrSummarization() {
  const [text, setText] = useState(DEFAULT_INPUT)

  const { blocks, lineErrors } = useMemo(() => {
    const lines = text.split('\n').map((l) => l.trim()).filter((l) => l !== '')
    const blocks = []
    const lineErrors = []

    lines.forEach((line, idx) => {
      const [ipPart, prefixPart] = line.split('/')
      const ipParsed = parseIPv4(ipPart)
      if (!ipParsed.valid) {
        lineErrors.push(`Baris ${idx + 1}: ${ipParsed.error}`)
        return
      }
      const prefix = prefixPart === undefined ? 32 : Number(prefixPart)
      if (!isValidPrefix(prefix)) {
        lineErrors.push(`Baris ${idx + 1}: prefix harus 0–32`)
        return
      }
      blocks.push({ networkInt: octetsToInt(ipParsed.octets), prefix, original: line })
    })

    return { blocks, lineErrors }
  }, [text])

  const summary = useMemo(() => {
    if (blocks.length === 0 || lineErrors.length > 0) return null
    return summarizeCidr(blocks)
  }, [blocks, lineErrors])

  const aggregateInfo = useMemo(() => {
    if (!summary || summary.error) return null
    return calcSubnetInfo(summary.networkInt, summary.prefix)
  }, [summary])

  return (
    <div className="space-y-6">
      <ToolHeader
        title="CIDR Summarization"
        description="Masukkan beberapa network (satu per baris, format IP/prefix) untuk dicari satu blok CIDR gabungan yang mencakup semuanya."
      />

      <div className="bg-panel border border-line rounded p-5">
        <Field label="Daftar network (satu per baris)">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder={'192.168.0.0/24\n192.168.1.0/24'}
            className={`${inputClass} resize-y leading-relaxed`}
          />
        </Field>

        {lineErrors.length > 0 && (
          <ul className="mt-3 space-y-1">
            {lineErrors.map((err, i) => (
              <li key={i} className="text-sm text-red-600">
                {err}
              </li>
            ))}
          </ul>
        )}
      </div>

      {aggregateInfo && (
        <div>
          <h3 className="text-sm font-semibold text-ink mb-3">Hasil agregasi</h3>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="CIDR gabungan" value={`${aggregateInfo.network}/${aggregateInfo.prefix}`} />
            <ResultCard label="Subnet mask" value={aggregateInfo.mask} />
            <ResultCard
              label="Rentang mencakup"
              value={`${aggregateInfo.network} – ${aggregateInfo.broadcast}`}
              wide
            />
            <ResultCard label="Total alamat tercakup" value={aggregateInfo.totalHosts.toLocaleString('id-ID')} wide />
          </div>
          <p className="text-xs text-muted mt-3 leading-relaxed">
            Catatan: blok gabungan adalah blok CIDR terkecil yang mencakup seluruh network di atas — bila
            network-network tersebut tidak berbatasan rapi, blok ini bisa mencakup alamat tambahan di luar
            input aslinya.
          </p>
        </div>
      )}

      {blocks.length > 0 && lineErrors.length === 0 && (
        <div className="bg-panel border border-line rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="px-4 py-2.5 text-xs font-medium text-muted">Input</th>
                <th className="px-4 py-2.5 text-xs font-medium text-muted">Network</th>
                <th className="px-4 py-2.5 text-xs font-medium text-muted">Broadcast</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((b, i) => {
                const info = calcSubnetInfo(b.networkInt, b.prefix)
                return (
                  <tr key={i} className="border-b border-line last:border-0">
                    <td className="px-4 py-2.5 font-mono text-xs text-muted whitespace-nowrap">
                      {b.original}
                    </td>
                    <td className="px-4 py-2.5 font-mono whitespace-nowrap">
                      {info.network}/{b.prefix}
                    </td>
                    <td className="px-4 py-2.5 font-mono whitespace-nowrap">{info.broadcast}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
