import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('tweakrAPI', {
  window: {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
  },
  tweaks: {
    apply: (id: string) => ipcRenderer.invoke('tweaks:apply', id),
    status: () => ipcRenderer.invoke('tweaks:status'),
  },
  debloat: {
    list: () => ipcRenderer.invoke('debloat:list'),
    remove: (id: string) => ipcRenderer.invoke('debloat:remove', id),
  },
  gpu: {
    info: () => ipcRenderer.invoke('gpu:info'),
    setPowerLimit: (w: number) => ipcRenderer.invoke('gpu:set-power-limit', w),
  },
  usb: {
    list: () => ipcRenderer.invoke('usb:list'),
  },
  config: {
    load: () => ipcRenderer.invoke('config:load'),
    save: (cfg: Record<string, unknown>) => ipcRenderer.invoke('config:save', cfg),
  },
  updater: {
    check: () => ipcRenderer.invoke('updater:check'),
  },
})
