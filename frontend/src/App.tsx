import { useState } from 'react'
import { TestAlias } from '@/components/TestAlias'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion/FadeIn'
import { Search } from 'lucide-react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <TestAlias />
      <div className="mt-6 grid gap-6">
        <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
          <h2 className="text-xl font-semibold tracking-tight">Tailwind Active</h2>
          <p className="text-sm opacity-90">Utility classes confirmed (v4 plugin build path).</p>
        </div>
        <FadeIn>
          <div className="p-4 rounded-lg border border-indigo-500/40 bg-neutral-900/40 backdrop-blur">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Search className="w-4 h-4" /> Demo UI Primitives
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost" size="sm">Ghost Small</Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  )
}

export default App
