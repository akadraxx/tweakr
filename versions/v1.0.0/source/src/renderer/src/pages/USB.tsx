import { useEffect, useState } from 'react'

export default function USB() {
  const [devices, setDevices] = useState<any[]>([])

  useEffect(() => {
    ;(window as any).tweakrAPI.usb.list().then((r: any) => {
      if (r.success) setDevices(r.devices)
    })
  }, [])

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-100 mb-6">USB Devices</h1>
      <div className="flex flex-col gap-2">
        {devices.map((d, i) => (
          <div key={i} className="bg-[#131620] border border-[#1e2130] rounded-xl p-3 flex items-center justify-between">
            <p className="text-xs text-gray-300">{d.FriendlyName ?? 'Unknown Device'}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.Status === 'OK' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>{d.Status}</span>
          </div>
        ))}
        {devices.length === 0 && <p className="text-xs text-gray-500">No USB devices found.</p>}
      </div>
    </div>
  )
}
