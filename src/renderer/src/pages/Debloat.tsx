import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

interface AppEntry { id: string; installed: boolean }

export default function Debloat() {
  const [apps, setApps] = useState<AppEntry[]>([])
  const [removing, setRemoving] = useState<string | null>(null)
  const installed = apps.filter(a => a.installed)

  useEffect(() => {
    ;(window as any).tweakrAPI.debloat.list().then(setApps)
  }, [])

  const remove = async (id: string) => {
    setRemoving(id)
    await (window as any).tweakrAPI.debloat.remove(id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, installed: false } : a))
    setRemoving(null)
  }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Debloat</h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{installed.length} removable apps found</p>
        </div>
        {installed.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}>
            <Trash2 size={11} />
            <span>{installed.length} Installed</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {apps.map(a => (
          <div
            key={a.id}
            className="fade-in flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-150"
            style={{
              background: 'var(--bg-elevated)',
              border: `1px solid ${a.installed ? 'var(--border)' : 'transparent'}`,
              opacity: a.installed ? 1 : 0.4,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: a.installed ? '#ef4444' : 'var(--text-muted)', boxShadow: a.installed ? '0 0 6px #ef4444' : 'none' }} />
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{a.id.replace('Microsoft.', '')}</p>
            </div>
            {a.installed ? (
              <button
                onClick={() => remove(a.id)}
                disabled={removing === a.id}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', opacity: removing === a.id ? 0.5 : 1 }}
              >
                <Trash2 size={10} />
                {removing === a.id ? 'Removing...' : 'Remove'}
              </button>
            ) : (
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Removed</span>
            )}
          </div>
        ))}
        {apps.length === 0 && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Scanning...</p>}
      </div>
    </div>
  )
}
