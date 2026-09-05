import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
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

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-base transition-colors duration-300">
        {/* Decorative soft gradient blobs — glass surfaces need some color
            behind them for the blur effect to actually read as "glass". */}
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-accentTint/60 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="flex md:flex-row">
          <Sidebar active={active} onSelect={setActive} />

          <main className="flex-1 min-w-0 pt-24 md:pt-8 px-4 md:px-8 pb-12">
            <div className="max-w-3xl mx-auto">
              <ActivePanel />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
