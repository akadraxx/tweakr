import { useEffect, useState } from 'react'

interface AppEntry { id: string; installed: boolean }

export default function Debloat() {
  const [apps, setApps] = useState<AppEntry[]>([])
  const [removing, setRemoving] = useState<string | null>(null)

  useEffect(() => {
    ;(window as any).tweakrAPI.debloat.list().then(setApps)
  }, [])

  const remove = async (id: string) => {
    setRemoving(id)
    await (window as any).tweakrAPI.debloat.remove(id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, installed: false } : a))
    setRemoving(null)
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-100 mb-6">Debloat</h1>
      <div className="flex flex-col gap-2">
        {apps.map(a => (
          <div key={a.id} className="bg-[#131620] border border-[#1e2130] rounded-xl p-3 flex items-center justify-between">
            <p className="text-xs text-gray-300">{a.id.replace('Microsoft.', '')}</p>
            {a.installed ? (
              <button onClick={() => remove(a.id)} disabled={removing === a.id}
                className="text-xs px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50">
                {removing === a.id ? 'Removing...' : 'Remove'}
              </button>
            ) : (
              <span className="text-xs text-gray-600">Removed</span>
            )}
          </div>
        ))}
        {apps.length === 0 && <p className="text-xs text-gray-500">Scanning installed apps...</p>}
      </div>
    </div>
  )
}
