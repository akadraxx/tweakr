import { create } from 'zustand'

interface AppState {
  activeTweaks: Record<string, boolean>
  setTweakActive: (id: string, val: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeTweaks: {},
  setTweakActive: (id, val) => set((s) => ({ activeTweaks: { ...s.activeTweaks, [id]: val } })),
}))
