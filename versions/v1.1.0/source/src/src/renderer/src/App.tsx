import { Routes, Route } from 'react-router-dom'
import TitleBar from './components/TitleBar'
import Sidebar from './components/Sidebar'
import StatusBar from './components/StatusBar'
import Dashboard from './pages/Dashboard'
import Tweaks from './pages/Tweaks'
import Debloat from './pages/Debloat'
import GPU from './pages/GPU'
import USB from './pages/USB'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
          <div className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tweaks" element={<Tweaks />} />
              <Route path="/debloat" element={<Debloat />} />
              <Route path="/gpu" element={<GPU />} />
              <Route path="/usb" element={<USB />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <StatusBar />
        </div>
      </div>
    </div>
  )
}
