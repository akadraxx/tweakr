import { useEffect, useState } from 'react'
import TweakCard from '../components/TweakCard'
import { useAppStore } from '../store/useAppStore'

const TWEAKS = [
  { id: 'disable-fullscreen-optim', title: 'Disable Fullscreen Optimizations', description: 'Prevents Windows from overriding exclusive fullscreen mode.' },
  { id: 'high-performance-power', title: 'High Performance Power Plan', description: 'Activates the high performance power scheme.' },
  { id: 'disable-nagle', title: 'Disable Nagle Algorithm', description: 'Reduces network latency by disabling packet coalescing.' },
  { id: 'disable-xbox-game-bar', title: 'Disable Xbox Game Bar', description: 'Stops Game Bar from capturing in the background.' },
  { id: 'disable-mouse-accel', title: 'Disable Mouse Acceleration', description: 'Raw 1:1 mouse input, no speed scaling.' },
]

export default function Tweaks() {
  const { activeTweaks, setTweakActive } = useAppStore()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    ;(window as any).tweakrAPI.tweaks.status().then((status: Record<string, boolean>) => {
      Object.entries(status).forEach(([id, val]) => setTweakActive(id, val))
      setLoaded(true)
    })
  }, [])

  if (!loaded) return <p className="text-xs text-gray-500">Loading tweak status...</p>

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-100 mb-6">System Tweaks</h1>
      <div className="flex flex-col gap-3">
        {TWEAKS.map(t => <TweakCard key={t.id} {...t} active={activeTweaks[t.id] ?? false} />)}
      </div>
    </div>
  )
}
