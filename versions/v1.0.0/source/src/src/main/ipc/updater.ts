import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

export function registerUpdaterHandlers(): void {
  ipcMain.handle('updater:check', async () => {
    try {
      await autoUpdater.checkForUpdates()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })
}
