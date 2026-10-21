import { ipcMain } from 'electron'
import { execSync } from 'child_process'

export function registerTweakHandlers(): void {
  ipcMain.handle('tweaks:apply', async (_event, tweakId: string) => {
    try {
      switch (tweakId) {
        case 'disable-fullscreen-optim':
          execSync('reg add "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehavior /t REG_DWORD /d 2 /f')
          break
        case 'high-performance-power':
          execSync('powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c')
          break
        case 'disable-nagle':
          execSync('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v TcpAckFrequency /t REG_DWORD /d 1 /f')
          execSync('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v TCPNoDelay /t REG_DWORD /d 1 /f')
          break
        case 'disable-xbox-game-bar':
          execSync('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f')
          break
        case 'disable-mouse-accel':
          execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f')
          execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d 0 /f')
          execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d 0 /f')
          break
        default:
          throw new Error(`Unknown tweak: ${tweakId}`)
      }
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })

  ipcMain.handle('tweaks:status', async () => {
    const results: Record<string, boolean> = {}
    try {
      const fse = execSync('reg query "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehavior 2>nul').toString()
      results['disable-fullscreen-optim'] = fse.includes('0x2')
    } catch { results['disable-fullscreen-optim'] = false }
    try {
      const pwr = execSync('powercfg /getactivescheme').toString()
      results['high-performance-power'] = pwr.includes('8c5e7fda')
    } catch { results['high-performance-power'] = false }
    try {
      const dvr = execSync('reg query "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled 2>nul').toString()
      results['disable-xbox-game-bar'] = dvr.includes('0x0')
    } catch { results['disable-xbox-game-bar'] = false }
    try {
      const ms = execSync('reg query "HKCU\\Control Panel\\Mouse" /v MouseSpeed 2>nul').toString()
      results['disable-mouse-accel'] = ms.includes('0x0') || ms.includes('REG_SZ    0')
    } catch { results['disable-mouse-accel'] = false }
    results['disable-nagle'] = false
    return results
  })
}
