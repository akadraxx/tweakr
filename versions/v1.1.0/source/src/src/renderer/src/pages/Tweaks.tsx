import { useEffect, useState } from 'react'
import TweakCard from '../components/TweakCard'
import { useAppStore } from '../store/useAppStore'
import { Zap } from 'lucide-react'

const TWEAKS = [
  { id: 'disable-fullscreen-optim', title: 'Disable Fullscreen Optimizations', description: 'Prevents Windows from overriding exclusive fullscreen mode.', risk: 'safe' as const },
  { id: 'high-performance-power', title: 'High Performance Power Plan', description: 'Activates the high performance power scheme.', risk: 'safe' as const },
  { id: 'disable-nagle', title: 'Disable Nagle Algorithm', description: 'Reduces network latency by disabling packet coalescing.', risk: 'moderate' as const },
  { id: 'disable-xbox-game-bar', title: 'Disable Xbox Game Bar', description: 'Stops Game Bar from capturing in the background.', risk: 'safe' as const },
  { id: 'disable-mouse-accel', title: 'Disable Mouse Acceleration', description: 'Raw 1:1 mouse input, no speed scaling.', risk: 'safe' as const },
]

export default function Tweaks() {
  const { activeTweaks, setTweakActive } = useAppStore()
  const [loaded, setLoaded] = useState(false)
  const activeCount = TWEAKS.filter(t => activeTweaks[t.id]).length

  useEffect(() => {
    ;(window as any).tweakrAPI.tweaks.status().then((status: Record<string, boolean>) => {
      Object.entries(status).forEach(([id, val]) => setTweakActive(id, val))
      setLoaded(true)
    })
  }, [])

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>System Tweaks</h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{activeCount} of {TWEAKS.length} active</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(124,92,252,0.3)', color: 'var(--accent)' }}>
          <Zap size={11} />
          <span>{activeCount} Active</span>
        </div>
      </div>
      <div className="mb-3 flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#22c55e' }} />Safe</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#f59e0b' }} />Moderate</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#ef4444' }} />Advanced</span>
      </div>
      {!loaded ? (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Reading registry...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {TWEAKS.map(t => <TweakCard key={t.id} {...t} active={activeTweaks[t.id] ?? false} />)}
        </div>
      )}
    </div>
  )
}
