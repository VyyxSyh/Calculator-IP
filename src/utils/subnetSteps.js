// Manual, step-by-step subnetting breakdown for the "Learning Subnetting"
// page — same bitwise math as the rest of the app (ipUtils.js), just
// exposed as discrete, explainable steps instead of a final result only.
import { octetsToInt, intToOctets, prefixToMaskInt, wildcardFromPrefix, calcSubnetInfo } from './ipUtils'

const MAX_TABLE_ROWS = 64

function octetBinary(n) {
  return n.toString(2).padStart(8, '0')
}

// Classful default prefix, used only to compute "borrowed bits" (x) in
// Step 2 — the classic manual-subnetting formula taught in intro courses.
function classInfoFor(firstOctet) {
  if (firstOctet >= 1 && firstOctet <= 126) return { label: 'A', defaultPrefix: 8 }
  if (firstOctet === 127) return { label: 'A (loopback)', defaultPrefix: 8 }
  if (firstOctet >= 128 && firstOctet <= 191) return { label: 'B', defaultPrefix: 16 }
  if (firstOctet >= 192 && firstOctet <= 223) return { label: 'C', defaultPrefix: 24 }
  return { label: 'D/E', defaultPrefix: null }
}

// Assumes ipOctets/prefix are already validated (parseIPv4 + isValidPrefix
// upstream) — this function is pure computation, no error handling.
export function computeSubnettingSteps(ipOctets, prefix) {
  const ipInt = octetsToInt(ipOctets)
  const maskInt = prefixToMaskInt(prefix)
  const maskOctets = intToOctets(maskInt)
  const wildcardInt = wildcardFromPrefix(prefix)
  const wildcardOctets = intToOctets(wildcardInt)
  const networkInt = (ipInt & maskInt) >>> 0
  const networkOctets = intToOctets(networkInt)
  const broadcastInt = (networkInt | wildcardInt) >>> 0
  const broadcastOctets = intToOctets(broadcastInt)

  const ipBin = ipOctets.map(octetBinary)
  const maskBin = maskOctets.map(octetBinary)
  const wildcardBin = wildcardOctets.map(octetBinary)
  const networkBin = networkOctets.map(octetBinary)
  const broadcastBin = broadcastOctets.map(octetBinary)

  // Step 1 — subnet mask: prefix as binary per octet, then to decimal.
  const prefixBitsPerOctet = [0, 1, 2, 3].map((o) =>
    Array.from({ length: 8 }, (_, b) => (o * 8 + b < prefix ? '1' : '0')).join('')
  )

  // Step 2 — number of subnets = 2^x, x = borrowed bits from the host
  // portion (new prefix minus the classful default prefix).
  const cls = classInfoFor(ipOctets[0])
  const defaultPrefix = cls.defaultPrefix
  const x = defaultPrefix === null ? null : prefix - defaultPrefix
  const isSupernetting = x !== null && x < 0
  const subnetCount = x !== null && x >= 0 ? Math.pow(2, x) : null

  // Step 3 — hosts per subnet = 2^y - 2, y = remaining host bits.
  const y = 32 - prefix
  const hostCount = Math.max(Math.pow(2, y) - 2, 0)

  // Step 4 — block size = 256 - (value of the first octet in the mask
  // that isn't 255, i.e. the "interesting octet").
  let interestingIdx = maskOctets.findIndex((o) => o !== 255)
  if (interestingIdx === -1) interestingIdx = 3
  const relevantMaskValue = maskOctets[interestingIdx]
  const blockSize = 256 - relevantMaskValue

  // Step 7 — enumerate every sibling subnet that shares the octets before
  // `interestingIdx` with the input IP (the ones the block size varies).
  const totalSiblingSubnets = Math.ceil(256 / blockSize)
  const rowsToShow = Math.min(totalSiblingSubnets, MAX_TABLE_ROWS)
  const subnetRows = []
  for (let i = 0; i < rowsToShow; i++) {
    const subnetOctets = [...networkOctets]
    subnetOctets[interestingIdx] = i * blockSize
    for (let k = interestingIdx + 1; k < 4; k++) subnetOctets[k] = 0
    subnetRows.push(calcSubnetInfo(octetsToInt(subnetOctets), prefix))
  }

  return {
    mask: { prefixBitsPerOctet, maskOctets },
    subnetCountStep: { classLabel: cls.label, defaultPrefix, x, isSupernetting, subnetCount },
    hostStep: { y, hostCount },
    blockStep: { interestingIdx, relevantMaskValue, blockSize },
    networkStep: { ipBin, maskBin, networkBin, networkOctets },
    broadcastStep: { networkBin, wildcardBin, broadcastBin, broadcastOctets },
    summaryTable: {
      blockSize,
      totalSiblingSubnets,
      rowsToShow,
      truncated: totalSiblingSubnets > MAX_TABLE_ROWS,
      subnetRows,
      // When borrowed bits span more than the one "interesting" octet
      // (e.g. a Class A/B network subnetted deep), the sibling count here
      // legitimately differs from 2^x in Step 2 — flagged so the page can
      // add a clarifying note instead of looking like a bug.
      countMismatchNote: subnetCount !== null && subnetCount !== totalSiblingSubnets,
    },
  }
}