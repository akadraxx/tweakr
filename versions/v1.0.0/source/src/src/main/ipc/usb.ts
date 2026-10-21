import { ipcMain } from 'electron'
import { execSync } from 'child_process'

export function registerUSBHandlers(): void {
  ipcMain.handle('usb:list', async () => {
    try {
      const out = execSync('powershell -NoProfile -Command "Get-PnpDevice -Class USB | Select-Object Status,FriendlyName | ConvertTo-Json"').toString()
      return { success: true, devices: JSON.parse(out) }
    } catch (err: any) {
      return { success: false, error: err.message, devices: [] }
    }
  })
}
