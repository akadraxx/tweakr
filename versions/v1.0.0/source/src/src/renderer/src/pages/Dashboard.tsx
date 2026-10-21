import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [gpuInfo, setGpuInfo] = useState<any>(null)

  useEffect(() => {
    ;(window as any).tweakrAPI.gpu.info().then(setGpuInfo)
  }, [])

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-100 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#131620] border border-[#1e2130] rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">GPU</p>
          <p className="text-sm font-medium text-gray-100">{gpuInfo?.success ? gpuInfo.name : 'Not detected'}</p>
          {gpuInfo?.success && <p className="text-xs text-gray-500 mt-1">{gpuInfo.temp}°C · {gpuInfo.gpuUtil}% util</p>}
        </div>
        <div className="bg-[#131620] border border-[#1e2130] rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Status</p>
          <p className="text-sm font-medium text-green-400">Running</p>
        </div>
      </div>
    </div>
  )
}
