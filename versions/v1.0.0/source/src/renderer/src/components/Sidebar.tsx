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
    <div className="w-16 flex flex-col items-center py-4 gap-2 bg-[#090b0f] border-r border-[#1a1d24]">
      <div className="w-8 h-8 rounded bg-violet-600 mb-4 flex items-center justify-center text-xs font-bold">T</div>
      {nav.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} title={label}
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-violet-600 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-[#1a1d24]'}`
          }>
          <Icon size={18} />
        </NavLink>
      ))}
    </div>
  )
}
