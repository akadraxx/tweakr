import { useEffect, useState, useRef } from 'react'
import { Cpu, HardDrive, Thermometer, Zap } from 'lucide-react'

interface GpuInfo { success: boolean; name: string; temp: number; gpuUtil: number; memUsed: number; memTotal: number; driver: string }

function StatCard({ icon: Icon, label, value, sub, accent }: { icon: any; label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div
      className="rounded-xl p-4 fade-in"
      style={{
        background: 'var(--bg-elevated)',
        border: `1px solid ${accent ? 'rgba(124,92,252,0.3)' : 'var(--border)'}`,
        boxShadow: accent ? '0 0 20px var(--accent-glow)' : 'none',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</span>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: accent ? 'var(--accent-glow)' : 'var(--bg-hover)' }}>
          <Icon size={13} style={{ color: accent ? 'var(--accent)' : 'var(--text-secondary)' }} />
        </div>
      </div>
      <p className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{sub}</p>}
    </div>
  )
}

function TempGauge({ temp }: { temp: number }) {
  const color = temp < 60 ? 'var(--green)' : temp < 80 ? 'var(--yellow)' : 'var(--red)'
  const pct = Math.min((temp / 100) * 100, 100)
  return (
    <div className="rounded-xl p-4 fade-in" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>GPU Temp</span>
        <Thermometer size={13} style={{ color: 'var(--text-secondary)' }} />
      </div>
      <p className="text-xl font-semibold mb-3" style={{ color }}>{temp}°C</p>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-hover)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [gpu, setGpu] = useState<GpuInfo | null>(null)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    const poll = async () => {
      const r = await (window as any).tweakrAPI.gpu.info()
      if (r.success) setGpu(r)
    }
    poll()
    intervalRef.current = setInterval(poll, 2000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>System overview — live</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <StatCard icon={Cpu} label="GPU" value={gpu?.name ?? 'Detecting...'} sub={`Driver ${gpu?.driver ?? '—'}`} accent={!!gpu} />
        <StatCard icon={Zap} label="GPU Util" value={gpu ? `${gpu.gpuUtil}%` : '—'} sub="Current load" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {gpu && <TempGauge temp={gpu.temp} />}
        <StatCard icon={HardDrive} label="VRAM" value={gpu ? `${gpu.memUsed} MB` : '—'} sub={gpu ? `of ${gpu.memTotal} MB` : ''} />
      </div>
    </div>
  )
}
