import { useState } from 'react'
import Sidebar, { TOOLS } from './components/Sidebar'
import SubnetCalculator from './components/SubnetCalculator'
import VlsmSplitter from './components/VlsmSplitter'
import CidrSummarization from './components/CidrSummarization'

const PANELS = {
  subnet: SubnetCalculator,
  vlsm: VlsmSplitter,
  cidr: CidrSummarization,
}

export default function App() {
  const [active, setActive] = useState('subnet')
  const ActivePanel = PANELS[active]
  const activeMeta = TOOLS.find((t) => t.id === active)

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar active={active} onSelect={setActive} />

      <main className="flex-1 min-w-0">
        <header className="md:hidden border-b border-line bg-panel px-5 py-4">
          <h1 className="font-sans text-base font-semibold text-ink">{activeMeta?.label}</h1>
        </header>
        <div className="max-w-3xl mx-auto px-5 py-8">
          <ActivePanel />
        </div>
      </main>
    </div>
  )
}
