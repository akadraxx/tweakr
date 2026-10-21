import { Minus, Square, X } from 'lucide-react'

export default function TitleBar() {
  return (
    <div
      className="flex items-center justify-between h-9 px-4 select-none shrink-0"
      style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)', WebkitAppRegion: 'drag' } as any}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded" style={{ background: 'var(--accent)' }}>
          <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5 p-0.5">
            <path d="M10 2L3 7v11h5v-5h4v5h5V7L10 2z"/>
          </svg>
        </div>
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.15em' }}>Tweakr</span>
      </div>
      <div className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <button
          onClick={() => (window as any).tweakrAPI.window.minimize()}
          className="w-7 h-7 flex items-center justify-center rounded transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        ><Minus size={12} /></button>
        <button
          onClick={() => (window as any).tweakrAPI.window.maximize()}
          className="w-7 h-7 flex items-center justify-center rounded transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        ><Square size={11} /></button>
        <button
          onClick={() => (window as any).tweakrAPI.window.close()}
          className="w-7 h-7 flex items-center justify-center rounded transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
        ><X size={12} /></button>
      </div>
    </div>
  )
}
