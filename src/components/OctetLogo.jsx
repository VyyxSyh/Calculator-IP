// Placeholder logo mark: four dots in a rounded square, echoing "octet"
// (4 groups of bits) and the network-node motif. Swap this SVG for the
// real logo asset when one is ready — everywhere else just imports
// <OctetLogo /> so nothing else needs to change.
export default function OctetLogo({ className = 'w-10 h-10' }) {
  return (
    <img src="src/Logo.png" className={className} alt="Octet" />
    // <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <rect width="36" height="36" rx="11" className="fill-accentSolid" />
    //   <circle cx="13" cy="13" r="3" fill="white" fillOpacity="0.95" />
    //   <circle cx="23" cy="13" r="3" fill="white" fillOpacity="0.7" />
    //   <circle cx="13" cy="23" r="3" fill="white" fillOpacity="0.7" />
    //   <circle cx="23" cy="23" r="3" fill="white" fillOpacity="0.95" />
    // </svg>
  )
}
