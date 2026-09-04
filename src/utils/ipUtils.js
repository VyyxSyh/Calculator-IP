// ---------------------------------------------------------------------------
// IPv4 core utilities
// All addresses are represented internally as unsigned 32-bit integers
// (via the `>>> 0` trick) so every calculation is plain bitwise arithmetic —
// nothing here is hardcoded per class or per common prefix length.
// ---------------------------------------------------------------------------

export function parseIPv4(input) {
  if (typeof input !== 'string') return { valid: false, error: 'IP tidak boleh kosong' }
  const str = input.trim()
  if (str === '') return { valid: false, error: 'IP tidak boleh kosong' }

  const parts = str.split('.')
  if (parts.length !== 4) {
    return { valid: false, error: 'Format harus 4 oktet dipisah titik, misal 192.168.1.1' }
  }

  const octets = []
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) {
      return { valid: false, error: `Oktet "${p}" bukan angka valid` }
    }
    // Reject leading-zero forms like "01" to avoid octal-lookalike ambiguity
    if (p.length > 1 && p[0] === '0') {
      return { valid: false, error: `Oktet "${p}" tidak boleh berawalan 0` }
    }
    const n = Number(p)
    if (n < 0 || n > 255) {
      return { valid: false, error: `Oktet "${p}" harus di antara 0–255` }
    }
    octets.push(n)
  }
  return { valid: true, octets }
}

export function octetsToInt(octets) {
  return (((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0)
}

export function intToOctets(int) {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ]
}

export function intToIpString(int) {
  return intToOctets(int).join('.')
}

export function isValidPrefix(prefix) {
  return Number.isInteger(prefix) && prefix >= 0 && prefix <= 32
}

export function prefixToMaskInt(prefix) {
  if (prefix === 0) return 0
  return (0xffffffff << (32 - prefix)) >>> 0
}

// Validates that a dotted mask like 255.255.255.0 is a contiguous run of 1
// bits followed by 0 bits, and returns the equivalent prefix length.
export function maskStringToPrefix(maskStr) {
  const parsed = parseIPv4(maskStr)
  if (!parsed.valid) return { valid: false, error: parsed.error }
  const maskInt = octetsToInt(parsed.octets)
  // A valid mask, inverted, must be all-ones from the LSB with no gaps:
  // i.e. (~mask + 1) must be a power of two (or mask is all 1s / all 0s).
  const inverted = (~maskInt) >>> 0
  const isContiguous = ((inverted & (inverted + 1)) >>> 0) === 0
  if (!isContiguous) {
    return { valid: false, error: 'Subnet mask tidak valid (bit tidak kontigu)' }
  }
  let prefix = 0
  let m = maskInt
  for (let i = 0; i < 32; i++) {
    if ((m & 0x80000000) !== 0) prefix++
    m = (m << 1) >>> 0
  }
  return { valid: true, prefix }
}

export function wildcardFromPrefix(prefix) {
  return (~prefixToMaskInt(prefix)) >>> 0
}

export function getIpClass(firstOctet) {
  if (firstOctet >= 1 && firstOctet <= 126) return 'A'
  if (firstOctet === 127) return 'A (loopback)'
  if (firstOctet >= 128 && firstOctet <= 191) return 'B'
  if (firstOctet >= 192 && firstOctet <= 223) return 'C'
  if (firstOctet >= 224 && firstOctet <= 239) return 'D (multicast)'
  if (firstOctet >= 240 && firstOctet <= 255) return 'E (reserved)'
  return '-'
}

const PRIVATE_RANGES = [
  { net: octetsToInt([10, 0, 0, 0]), prefix: 8 },
  { net: octetsToInt([172, 16, 0, 0]), prefix: 12 },
  { net: octetsToInt([192, 168, 0, 0]), prefix: 16 },
]

export function isPrivateIp(ipInt) {
  return PRIVATE_RANGES.some(({ net, prefix }) => {
    const mask = prefixToMaskInt(prefix)
    return (ipInt & mask) >>> 0 === (net & mask) >>> 0
  })
}

// Full subnet breakdown for the Subnet Calculator.
export function calcSubnetInfo(ipInt, prefix) {
  const mask = prefixToMaskInt(prefix)
  const wildcard = (~mask) >>> 0
  const network = (ipInt & mask) >>> 0
  const broadcast = (network | wildcard) >>> 0

  const totalHosts = Math.pow(2, 32 - prefix)
  const usableHosts = prefix >= 31 ? 0 : totalHosts - 2
  const firstHost = prefix >= 31 ? network : (network + 1) >>> 0
  const lastHost = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0

  const firstOctet = intToOctets(ipInt)[0]

  return {
    ip: intToIpString(ipInt),
    prefix,
    network: intToIpString(network),
    networkInt: network,
    broadcast: intToIpString(broadcast),
    broadcastInt: broadcast,
    mask: intToIpString(mask),
    wildcard: intToIpString(wildcard),
    firstHost: intToIpString(firstHost),
    lastHost: intToIpString(lastHost),
    usableHosts: Math.max(usableHosts, 0),
    totalHosts,
    ipClass: getIpClass(firstOctet),
    isPrivate: isPrivateIp(ipInt),
  }
}

// Per-octet binary breakdown, each bit flagged as network/host, for the
// visual bit diagram in the Subnet Calculator.
export function binaryBreakdown(ipInt, prefix) {
  const bits = ipInt.toString(2).padStart(32, '0').split('')
  const octets = [0, 1, 2, 3].map((octetIdx) => {
    const octetBits = bits.slice(octetIdx * 8, octetIdx * 8 + 8)
    return octetBits.map((bit, bitIdx) => {
      const globalBitIndex = octetIdx * 8 + bitIdx
      return { bit, isNetwork: globalBitIndex < prefix }
    })
  })
  return octets
}

// ---------------------------------------------------------------------------
// VLSM / equal subnet splitting
// ---------------------------------------------------------------------------

// Smallest prefix length whose block can hold `hostsNeeded` usable hosts.
// Handles /31 and /32 edge cases (no usable-host subtraction needed there).
function prefixForHosts(hostsNeeded) {
  if (hostsNeeded <= 0) return 32
  for (let prefix = 32; prefix >= 0; prefix--) {
    const total = Math.pow(2, 32 - prefix)
    const usable = prefix >= 31 ? total : total - 2
    if (usable >= hostsNeeded) return prefix
  }
  return 0
}

// Allocates one subnet per requested host count, largest requirement first
// (standard VLSM practice — this minimises fragmentation/waste). Subnets are
// carved sequentially from the start of the base network; if a requirement
// no longer fits before the base network's address space runs out, that
// request (and everything after it) is reported as failed.
export function vlsmAllocate(baseNetworkInt, basePrefix, hostRequests) {
  const baseMask = prefixToMaskInt(basePrefix)
  const blockStart = (baseNetworkInt & baseMask) >>> 0
  const blockSize = Math.pow(2, 32 - basePrefix)
  const blockEnd = blockStart + blockSize - 1 // inclusive, as a plain number

  // Keep original order/labels but process largest-hosts-first internally.
  const withIndex = hostRequests.map((hosts, idx) => ({ hosts, idx }))
  const ordered = [...withIndex].sort((a, b) => b.hosts - a.hosts)

  let cursor = blockStart // plain number arithmetic below avoids 32-bit overflow mid-loop
  const resultsByIndex = new Array(hostRequests.length)

  for (const { hosts, idx } of ordered) {
    const subnetPrefix = prefixForHosts(hosts)
    if (subnetPrefix === 0 && hosts > Math.pow(2, 32) - 2) {
      resultsByIndex[idx] = { error: 'Jumlah host melebihi kapasitas IPv4' }
      continue
    }
    const subnetSize = Math.pow(2, 32 - subnetPrefix)
    // Align cursor up to a boundary this subnet size can start on.
    const alignedStart = Math.ceil(cursor / subnetSize) * subnetSize
    const subnetEnd = alignedStart + subnetSize - 1

    if (alignedStart > blockEnd || subnetEnd > blockEnd) {
      resultsByIndex[idx] = {
        error: `Tidak muat: butuh ${hosts} host (blok /${subnetPrefix}) tapi ruang alamat sudah habis`,
      }
      continue
    }

    const networkInt = alignedStart >>> 0
    const info = calcSubnetInfo(networkInt, subnetPrefix)
    resultsByIndex[idx] = {
      requested: hosts,
      prefix: subnetPrefix,
      ...info,
    }
    cursor = subnetEnd + 1
  }

  return resultsByIndex
}

// Equal-split mode: divide one network into N equal-size subnets.
export function equalSplit(baseNetworkInt, basePrefix, count) {
  if (count <= 0) return { error: 'Jumlah subnet harus lebih dari 0' }
  const bitsNeeded = Math.ceil(Math.log2(count))
  const newPrefix = basePrefix + bitsNeeded
  if (newPrefix > 32) {
    return { error: `Tidak bisa membagi /${basePrefix} menjadi ${count} subnet (butuh /${newPrefix})` }
  }
  const baseMask = prefixToMaskInt(basePrefix)
  const blockStart = (baseNetworkInt & baseMask) >>> 0
  const subnetSize = Math.pow(2, 32 - newPrefix)

  const subnets = []
  for (let i = 0; i < count; i++) {
    const networkInt = (blockStart + i * subnetSize) >>> 0
    subnets.push({ prefix: newPrefix, ...calcSubnetInfo(networkInt, newPrefix) })
  }
  return { subnets, newPrefix }
}

// ---------------------------------------------------------------------------
// CIDR Summarization (route aggregation)
// ---------------------------------------------------------------------------

// Given a list of { networkInt, prefix } blocks, finds the smallest single
// CIDR block that contains all of them.
//
// Algorithm: take the lowest start address and the highest end (broadcast)
// address across all input blocks. XOR those two addresses — the position
// of the highest set bit in the XOR result tells us how many leading bits
// the two addresses still have in common. That common-bit count is the
// aggregate prefix length, and masking either address with it gives the
// aggregate network address.
export function summarizeCidr(blocks) {
  if (blocks.length === 0) return { error: 'Masukkan minimal satu network' }

  let minStart = Infinity
  let maxEnd = -Infinity
  for (const { networkInt, prefix } of blocks) {
    const mask = prefixToMaskInt(prefix)
    const start = (networkInt & mask) >>> 0
    const end = (start | ((~mask) >>> 0)) >>> 0
    if (start < minStart) minStart = start
    if (end > maxEnd) maxEnd = end
  }

  if (blocks.length === 1) {
    const only = blocks[0]
    const mask = prefixToMaskInt(only.prefix)
    return {
      prefix: only.prefix,
      networkInt: (only.networkInt & mask) >>> 0,
    }
  }

  const diff = (minStart ^ maxEnd) >>> 0
  // Count how many bits are needed to represent `diff` — that many low bits
  // differ between the two addresses, so the rest (32 - that count) match.
  let bitsDiffering = 0
  if (diff !== 0) {
    bitsDiffering = 32 - Math.clz32(diff)
  }
  const aggregatePrefix = 32 - bitsDiffering
  const aggregateMask = prefixToMaskInt(aggregatePrefix)
  const aggregateNetwork = (minStart & aggregateMask) >>> 0

  return {
    prefix: aggregatePrefix,
    networkInt: aggregateNetwork,
    minStart,
    maxEnd,
  }
}
