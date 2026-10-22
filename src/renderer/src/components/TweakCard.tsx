import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

interface Props {
  id: string
  title: string
  description: string
  active: boolean
  risk?: 'safe' | 'moderate' | 'advanced'
}

const riskColors = {
  safe: '#22c55e',
  moderate: '#f59e0b',
  advanced: '#ef4444',
}

export default function TweakCard({ id, title, description, active, risk = 'safe' }: Props) {
  const [loading, setLoading] = useState(false)
  const setTweakActive = useAppStore(s => s.setTweakActive)

  const toggle = async () => {
    setLoading(true)
    const result = await (window as any).tweakrAPI.tweaks.apply(id)
    if (result.success) setTweakActive(id, !active)
    setLoading(false)
  }

  return (
    <div
      className="fade-in flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl transition-all duration-150 cursor-default"
      style={{
        background: active ? 'rgba(124,92,252,0.06)' : 'var(--bg-elevated)',
        border: `1px solid ${active ? 'rgba(124,92,252,0.25)' : 'var(--border)'}`,
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)' }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: riskColors[risk], boxShadow: `0 0 6px ${riskColors[risk]}` }} />
        <div className="min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{title}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{description}</p>
        </div>
      </div>
      <button
        onClick={toggle}
        disabled={loading}
        className="shrink-0 relative transition-all duration-200"
        style={{ opacity: loading ? 0.5 : 1 }}
      >
        <div
          className="w-11 h-6 rounded-full transition-all duration-200"
          style={{
            background: active ? 'var(--accent)' : 'var(--bg-hover)',
            border: `1px solid ${active ? 'var(--accent)' : 'var(--border-bright)'}`,
            boxShadow: active ? '0 0 12px var(--accent-glow-bright)' : 'none',
          }}
        >
          <div
            className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200"
            style={{
              background: active ? 'white' : 'var(--text-muted)',
              left: active ? '22px' : '2px',
              boxShadow: active ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
            }}
          />
        </div>
      </button>
    </div>
  )
}
