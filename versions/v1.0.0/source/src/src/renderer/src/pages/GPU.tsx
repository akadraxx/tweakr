import { useEffect, useState } from 'react'

export default function GPU() {
  const [info, setInfo] = useState<any>(null)
  const [powerLimit, setPowerLimit] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    ;(window as any).tweakrAPI.gpu.info().then(setInfo)
  }, [])

  const applyPower = async () => {
    const w = parseInt(powerLimit)
    if (!w) return
    const r = await (window as any).tweakrAPI.gpu.setPowerLimit(w)
    setMsg(r.success ? `Power limit set to ${w}W` : r.error)
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-100 mb-6">GPU</h1>
      {info?.success ? (
        <div className="flex flex-col gap-4">
          <div className="bg-[#131620] border border-[#1e2130] rounded-xl p-4 grid grid-cols-2 gap-3">
            <Stat label="Name" value={info.name} />
            <Stat label="Driver" value={info.driver} />
            <Stat label="Temp" value={`${info.temp}°C`} />
            <Stat label="GPU Util" value={`${info.gpuUtil}%`} />
            <Stat label="VRAM Used" value={`${info.memUsed} / ${info.memTotal} MB`} />
          </div>
          <div className="bg-[#131620] border border-[#1e2130] rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2">Power Limit (watts)</p>
            <div className="flex gap-2">
              <input value={powerLimit} onChange={e => setPowerLimit(e.target.value)}
                className="flex-1 bg-[#0d0f14] border border-[#2a2d3a] rounded px-3 py-1 text-sm text-gray-100 outline-none" placeholder="e.g. 200" />
              <button onClick={applyPower} className="px-4 py-1 rounded bg-violet-600 hover:bg-violet-700 text-sm text-white">Apply</button>
            </div>
            {msg && <p className="text-xs text-gray-400 mt-2">{msg}</p>}
          </div>
        </div>
      ) : (
        <p className="text-xs text-gray-500">nvidia-smi not found — NVIDIA GPU required.</p>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className="text-sm text-gray-100">{value}</p>
    </div>
  )
}
