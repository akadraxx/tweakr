import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

interface Props {
  id: string
  title: string
  description: string
  active: boolean
}

export default function TweakCard({ id, title, description, active }: Props) {
  const [loading, setLoading] = useState(false)
  const setTweakActive = useAppStore(s => s.setTweakActive)

  const toggle = async () => {
    setLoading(true)
    const result = await (window as any).tweakrAPI.tweaks.apply(id)
    if (result.success) setTweakActive(id, !active)
    setLoading(false)
  }

  return (
    <div className="bg-[#131620] border border-[#1e2130] rounded-xl p-4 flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-gray-100">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <button onClick={toggle} disabled={loading}
        className={`shrink-0 w-10 h-6 rounded-full transition-colors relative ${active ? 'bg-violet-600' : 'bg-[#2a2d3a]'} ${loading ? 'opacity-50' : ''}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${active ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}
