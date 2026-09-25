import { useState, useMemo } from 'react'
import { parseIPv4, isValidPrefix } from '../utils/ipUtils'
import { computeSubnettingSteps } from '../utils/subnetSteps'
import { ToolHeader, Field, inputClass } from './SubnetCalculator'
import AlignedBinary from './AlignedBinary'

export default function LearningSubnetting() {
  const [ipInput, setIpInput] = useState('192.168.10.1')
  const [prefixInput, setPrefixInput] = useState('25')

  const ipCheck = useMemo(() => parseIPv4(ipInput), [ipInput])
  const prefixCheck = useMemo(() => {
    const n = Number(prefixInput)
    if (!isValidPrefix(n)) return { valid: false, error: 'Prefix harus berupa angka bulat 0–32' }
    return { valid: true, prefix: n }
  }, [prefixInput])

  const steps = useMemo(() => {
    if (!ipCheck.valid || !prefixCheck.valid) return null
    return computeSubnettingSteps(ipCheck.octets, prefixCheck.prefix)
  }, [ipCheck, prefixCheck])

  return (
    <div className="space-y-6">
      <ToolHeader
        title="Learning Subnetting"
        description="Lihat proses hitung subnetting secara manual, langkah demi langkah lengkap dengan rumus — bukan cuma hasil akhirnya."
      />

      <div className="glass rounded-3xl p-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Alamat IP" error={!ipCheck.valid ? ipCheck.error : null}>
            <input
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="192.168.10.1"
              className={inputClass}
            />
          </Field>
          <Field label="Prefix CIDR (/0–/32)" error={!prefixCheck.valid ? prefixCheck.error : null}>
            <div className="flex items-center gap-2 max-w-[160px]">
              <span className="font-mono text-muted">/</span>
              <input
                value={prefixInput}
                onChange={(e) => setPrefixInput(e.target.value)}
                placeholder="25"
                inputMode="numeric"
                className={inputClass}
              />
            </div>
          </Field>
        </div>
      </div>

      {steps && (
        <div className="space-y-4">
          <Step1SubnetMask prefix={prefixCheck.prefix} data={steps.mask} />
          <Step2SubnetCount prefix={prefixCheck.prefix} data={steps.subnetCountStep} />
          <Step3HostCount data={steps.hostStep} />
          <Step4BlockSize data={steps.blockStep} />
          <Step5NetworkId prefix={prefixCheck.prefix} data={steps.networkStep} />
          <Step6BroadcastId data={steps.broadcastStep} />
          <Step7Summary data={steps.summaryTable} />
        </div>
      )}
    </div>
  )
}

function StepCard({ number, title, children }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-accentSolid text-white flex items-center justify-center text-sm font-bold shrink-0">
          {number}
        </span>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function FormulaLine({ formula, substitution, result }) {
  return (
    <div className="space-y-1.5 font-mono text-xs sm:text-sm">
      <p className="text-muted">{formula}</p>
      <p className="text-ink">{substitution}</p>
      <p className="text-accent font-bold">{result}</p>
    </div>
  )
}

function Note({ children }) {
  return <p className="text-xs text-muted mt-3 leading-relaxed">{children}</p>
}

// Step 1 — prefix as binary per octet, then converted to decimal (the mask).
function Step1SubnetMask({ prefix, data }) {
  return (
    <StepCard number={1} title="Subnet Mask">
      <AlignedBinary
        rows={[
          { label: 'Biner', bits: data.prefixBitsPerOctet, highlightBits: prefix },
          { label: 'Desimal', octets: data.maskOctets, result: true },
        ]}
      />
      <Note>
        Bit 1 (disorot) = bit network, bit 0 = bit host. Prefix /{prefix} berarti {prefix} bit pertama
        bernilai 1 — tiap oktet biner itu dikonversi ke desimal, hasilnya subnet mask{' '}
        <strong className="text-ink font-mono">{data.maskOctets.join('.')}</strong>.
      </Note>
    </StepCard>
  )
}

// Step 2 — number of subnets = 2^x.
function Step2SubnetCount({ prefix, data }) {
  return (
    <StepCard number={2} title="Jumlah Subnet">
      {data.subnetCount !== null ? (
        <FormulaLine
          formula="Jumlah Subnet = 2^x, x = prefix baru − prefix default kelas IP"
          substitution={`x = ${prefix} − ${data.defaultPrefix} (Kelas ${data.classLabel}) = ${data.x}`}
          result={`Jumlah Subnet = 2^${data.x} = ${data.subnetCount.toLocaleString('id-ID')}`}
        />
      ) : (
        <Note>
          {data.classLabel.startsWith('D')
            ? `IP ini masuk Kelas ${data.classLabel}, yang gak punya prefix default classful standar (biasanya bukan dipakai untuk host biasa), jadi rumus "borrowed bits" di sini gak berlaku secara umum.`
            : `Prefix /${prefix} lebih kecil dari prefix default Kelas ${data.classLabel} (/${data.defaultPrefix}) — ini supernetting (menggabungkan beberapa network), bukan subnetting biasa, jadi rumus 2^x di sini gak berlaku.`}
        </Note>
      )}
      {data.isSupernetting && (
        <Note>x hasilnya negatif ({data.x}), pertanda supernetting seperti dijelaskan di atas.</Note>
      )}
    </StepCard>
  )
}

// Step 3 — hosts per subnet = 2^y - 2.
function Step3HostCount({ data }) {
  return (
    <StepCard number={3} title="Jumlah Host per Subnet">
      <FormulaLine
        formula="Jumlah Host = 2^y − 2, y = bit host yang tersisa"
        substitution={`y = 32 − prefix = ${data.y}`}
        result={`Jumlah Host = 2^${data.y} − 2 = ${data.hostCount.toLocaleString('id-ID')}`}
      />
      <Note>Dikurangi 2 karena alamat pertama dipakai Network ID dan alamat terakhir dipakai Broadcast ID.</Note>
    </StepCard>
  )
}

// Step 4 — block size = 256 - (relevant mask octet value).
function Step4BlockSize({ data }) {
  return (
    <StepCard number={4} title="Blok Subnet (Block Size)">
      <FormulaLine
        formula="Blok Subnet = 256 − (nilai oktet subnet mask yang relevan)"
        substitution={`256 − ${data.relevantMaskValue} = ${data.blockSize}`}
        result={`Blok Subnet = ${data.blockSize}`}
      />
      <Note>
        Oktet yang relevan adalah oktet ke-{data.interestingIdx + 1} dari subnet mask — oktet pertama
        (dari kiri) yang nilainya bukan 255. Tiap subnet berikutnya melompat sebesar {data.blockSize} di
        oktet itu.
      </Note>
    </StepCard>
  )
}

// Step 5 — Network ID = IP AND Mask, shown per-octet binary stacked.
function Step5NetworkId({ prefix, data }) {
  return (
    <StepCard number={5} title="Network ID">
      <AlignedBinary
        rows={[
          { label: 'IP Address', bits: data.ipBin },
          { label: 'Subnet Mask', bits: data.maskBin, operator: 'AND' },
          { label: 'Network ID', bits: data.networkBin, result: true, divider: true },
        ]}
      />
      <Note>
        Tiap bit IP di-AND-kan dengan bit subnet mask (1 AND 1 = 1, selain itu = 0). Hasilnya Network ID
        = <strong className="text-ink font-mono">{data.networkOctets.join('.')}</strong> — alamat network
        untuk /{prefix} ini.
      </Note>
    </StepCard>
  )
}

// Step 6 — Broadcast ID = Network ID OR Wildcard mask.
function Step6BroadcastId({ data }) {
  return (
    <StepCard number={6} title="Broadcast ID">
      <AlignedBinary
        rows={[
          { label: 'Network ID', bits: data.networkBin },
          { label: 'Wildcard', bits: data.wildcardBin, operator: 'OR' },
          { label: 'Broadcast ID', bits: data.broadcastBin, result: true, divider: true },
        ]}
      />
      <Note>
        Wildcard mask adalah kebalikan (invers) dari subnet mask. Tiap bit Network ID di-OR-kan dengan
        bit wildcard (1 OR apapun = 1). Hasilnya Broadcast ID ={' '}
        <strong className="text-ink font-mono">{data.broadcastOctets.join('.')}</strong>.
      </Note>
    </StepCard>
  )
}

// Step 7 — summary table of every subnet formed by the block size.
function Step7Summary({ data }) {
  return (
    <StepCard number={7} title="Tabel Ringkasan Seluruh Subnet">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surfaceBorder/16 text-left">
              <Th>Subnet / Network ID</Th>
              <Th>Host Pertama</Th>
              <Th>Host Terakhir</Th>
              <Th>Broadcast ID</Th>
            </tr>
          </thead>
          <tbody>
            {data.subnetRows.map((row, i) => (
              <tr key={i} className="border-b border-surfaceBorder/12 last:border-0">
                <Td mono>{`${row.network}/${row.prefix}`}</Td>
                <Td mono>{row.usableHosts > 0 ? row.firstHost : '-'}</Td>
                <Td mono>{row.usableHosts > 0 ? row.lastHost : '-'}</Td>
                <Td mono>{row.broadcast}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.truncated && (
        <Note>
          Menampilkan {data.rowsToShow} dari {data.totalSiblingSubnets.toLocaleString('id-ID')} subnet
          (dipotong demi performa halaman).
        </Note>
      )}
      {data.countMismatchNote && (
        <Note>
          Catatan: tabel ini menampilkan subnet-subnet yang berbagi oktet-oktet sebelum blok subnet di
          atas. Kalau prefix baru jauh dari prefix default kelasnya (borrowed bits melewati satu oktet),
          jumlah barisnya bisa beda dari hasil Langkah 2 — itu wajar, bukan bug.
        </Note>
      )}
    </StepCard>
  )
}

function Th({ children }) {
  return <th className="px-4 py-2.5 text-xs font-semibold text-muted whitespace-nowrap">{children}</th>
}
function Td({ children, mono }) {
  return <td className={`px-4 py-2.5 whitespace-nowrap ${mono ? 'font-mono' : ''}`}>{children}</td>
}