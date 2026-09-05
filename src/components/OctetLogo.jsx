// Placeholder logo mark: four dots in a rounded square, echoing "octet"
// (4 groups of bits) and the network-node motif. Swap this SVG for the
// real logo asset when one is ready — everywhere else just imports
// <OctetLogo /> so nothing else needs to change.
export default function OctetLogo({ className = 'w-10 h-10' }) {
  return <img src="Logo.png" className={className} alt="Octet" />
  
}
