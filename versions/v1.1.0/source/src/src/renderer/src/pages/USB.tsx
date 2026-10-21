import { useEffect, useState } from 'react'
import { Usb } from 'lucide-react'

export default function USB() {
  const [devices, setDevices] = useState<any[]>([])

  useEffect(() => {
    ;(window as any).tweakrAPI.usb.list().then((r: any) => {
      if (r.success) setDevices(r.devices)
    })
  }, [])

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>USB Devices</h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{devices.length} devices enumerated</p>
      </div>
      <div className="flex flex-col gap-2">
        {devices.map((d, i) => (
          <div
            key={i}
            className="fade-in flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3">
              <Usb size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{d.FriendlyName ?? 'Unknown Device'}</p>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: d.Status === 'OK' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                color: d.Status === 'OK' ? 'var(--green)' : 'var(--red)',
                border: `1px solid ${d.Status === 'OK' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}
            >{d.Status}</span>
          </div>
        ))}
        {devices.length === 0 && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No USB devices found.</p>}
      </div>
    </div>
  )
}
