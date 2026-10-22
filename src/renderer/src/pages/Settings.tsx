import { useState } from 'react'
import { RefreshCw, Info } from 'lucide-react'

export default function Settings() {
  const [checking, setChecking] = useState(false)
  const [msg, setMsg] = useState('')

  const checkUpdate = async () => {
    setChecking(true)
    setMsg('')
    await (window as any).tweakrAPI.updater.check()
    setMsg('No updates available.')
    setChecking(false)
  }

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Application configuration</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center mt-0.5" style={{ background: 'var(--bg-hover)' }}>
              <RefreshCw size={13} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Check for Updates</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Current version: 1.0.2{msg && ` % ${msg}`}</p>
            </div>
          </div>
          <button
            onClick={checkUpdate}
            disabled={checking}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ background: 'var(--accent)', color: 'white', opacity: checking ? 0.6 : 1 }}
          >{checking ? 'Checking...' : 'Check'}</button>
        </div>
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center mt-0.5" style={{ background: 'var(--bg-hover)' }}>
              <Info size={13} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>About Tweakr</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>A Optimization Tool for Windows PC, hi guy!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
