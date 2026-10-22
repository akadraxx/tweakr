import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Zap, Trash2, Monitor, Usb, Settings } from 'lucide-react'

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tweaks', icon: Zap, label: 'Tweaks' },
  { to: '/debloat', icon: Trash2, label: 'Debloat' },
  { to: '/gpu', icon: Monitor, label: 'GPU' },
  { to: '/usb', icon: Usb, label: 'USB' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <div
      className="w-14 flex flex-col items-center py-3 gap-1 shrink-0"
      style={{ background: 'var(--bg-base)', borderRight: '1px solid var(--border)' }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 shrink-0" style={{ background: 'var(--accent)' }}>
        <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
          <path d="M10 2L3 7v11h5v-5h4v5h5V7L10 2z"/>
        </svg>
      </div>
      {nav.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          title={label}
          className="relative group w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-150"
          style={({ isActive }) => ({
            background: isActive ? 'var(--accent-glow-bright)' : 'transparent',
            color: isActive ? 'var(--accent)' : 'var(--text-muted)',
            boxShadow: isActive ? '0 0 0 1px var(--accent-dim)' : 'none',
          })}
        >
          {({ isActive }) => (
            <>
              <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
              <span
                className="absolute left-12 px-2 py-1 rounded text-xs font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
              >{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}
