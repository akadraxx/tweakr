import { useEffect, useState } from 'react'

export default function StatusBar() {
  const [temp, setTemp] = useState<number | null>(null)

  useEffect(() => {
    const poll = async () => {
      const r = await (window as any).tweakrAPI.gpu.info()
      if (r.success) setTemp(r.temp)
    }
    poll()
    const id = setInterval(poll, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="h-6 flex items-center px-4 gap-4 shrink-0"
      style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 10 }}
    >
      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>TWEAKR</span>
      <span>v1.0.0</span>
      <span style={{ color: 'var(--border-bright)' }}>|</span>
      <span>Administrator</span>
      {temp !== null && (
        <>
          <span style={{ color: 'var(--border-bright)' }}>|</span>
          <span>GPU {temp}°C</span>
        </>
      )}
      <div className="ml-auto flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)', boxShadow: '0 0 4px var(--green)' }} />
        <span>Running</span>
      </div>
    </div>
  )
}
