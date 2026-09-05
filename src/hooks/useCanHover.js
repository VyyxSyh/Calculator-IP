import { useEffect, useState } from 'react'

// True only for devices with a real hover-capable, fine pointer (mouse/
// trackpad) — false on touch devices, matching the "desktop only" rule for
// the binary hover popup.
export function useCanHover() {
  const [canHover, setCanHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handler = () => setCanHover(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return canHover
}
