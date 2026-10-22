import { ipcMain } from 'electron'
import { execSync } from 'child_process'

const BLOAT_APPS = [
  'Microsoft.BingNews', 'Microsoft.BingWeather', 'Microsoft.GetHelp',
  'Microsoft.Getstarted', 'Microsoft.MicrosoftSolitaireCollection',
  'Microsoft.People', 'Microsoft.WindowsFeedbackHub', 'Microsoft.Xbox.TCUI',
  'Microsoft.XboxApp', 'Microsoft.XboxGameOverlay', 'Microsoft.XboxGamingOverlay',
  'Microsoft.XboxIdentityProvider', 'Microsoft.XboxSpeechToTextOverlay',
  'Microsoft.YourPhone', 'Microsoft.ZuneMusic', 'Microsoft.ZuneVideo',
]

export function registerDebloatHandlers(): void {
  ipcMain.handle('debloat:list', async () => {
    return BLOAT_APPS.map(app => {
      try {
        const out = execSync(`powershell -NoProfile -Command "Get-AppxPackage -Name '${app}' | Select-Object -ExpandProperty Name" 2>nul`).toString().trim()
        return { id: app, installed: out.length > 0 }
      } catch {
        return { id: app, installed: false }
      }
    })
  })

  ipcMain.handle('debloat:remove', async (_event, appId: string) => {
    try {
      execSync(`powershell -NoProfile -Command "Get-AppxPackage -Name '${appId}' | Remove-AppxPackage"`)
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })
}
