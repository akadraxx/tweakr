import { useEffect, useState, useRef } from 'react'
import { Thermometer, Zap, HardDrive, Cpu } from 'lucide-react'

function StatTile({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={12} style={{ color: color ?? 'var(--text-secondary)' }} />
        <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
      </div>
      <p className="text-lg font-semibold" style={{ color: color ?? 'var(--text-primary)' }}>{value}</p>
    </div>
  )
}

export default function GPU() {
  const [info, setInfo] = useState<any>(null)
  const [powerLimit, setPowerLimit] = useState('')
  const [msg, setMsg] = useState('')
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    const poll = async () => {
      const r = await (window as any).tweakrAPI.gpu.info()
      if (r.success) setInfo(r)
    }
    poll()
    intervalRef.current = setInterval(poll, 2000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const applyPower = async () => {
    const w = parseInt(powerLimit)
    if (!w) return
    const r = await (window as any).tweakrAPI.gpu.setPowerLimit(w)
    setMsg(r.success ? `Power limit set to ${w}W` : r.error)
  }

  const tempColor = info ? (info.temp < 60 ? 'var(--green)' : info.temp < 80 ? 'var(--yellow)' : 'var(--red)') : 'var(--text-primary)'

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>GPU</h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{info?.name ?? 'Detecting...'} · Driver {info?.driver ?? '—'}</p>
      </div>
      {info?.success ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <StatTile icon={Thermometer} label="Temperature" value={`${info.temp}°C`} color={tempColor} />
            <StatTile icon={Zap} label="GPU Util" value={`${info.gpuUtil}%`} />
            <StatTile icon={HardDrive} label="VRAM Used" value={`${info.memUsed} MB`} />
            <StatTile icon={Cpu} label="VRAM Total" value={`${info.memTotal} MB`} />
          </div>
          <div className="rounded-xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-medium mb-3 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Power Limit</p>
            <div className="flex gap-2">
              <input
                value={powerLimit}
                onChange={e => setPowerLimit(e.target.value)}
                placeholder="Watts — e.g. 200"
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-all"
                style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={applyPower}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ background: 'var(--accent)', color: 'white' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
              >Apply</button>
            </div>
            {msg && <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>{msg}</p>}
          </div>
        </div>
      ) : (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>nvidia-smi not found — NVIDIA GPU required.</p>
      )}
    </div>
  )
}
