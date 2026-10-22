import { ipcMain } from 'electron'
import { execSync } from 'child_process'

export function registerTweakHandlers(): void {
  ipcMain.handle('tweaks:apply', async (_event, tweakId: string, enable: boolean = true) => {
    try {
      switch (tweakId) {
        case 'disable-fullscreen-optim':
          if (enable) {
            execSync('reg add "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehavior /t REG_DWORD /d 2 /f')
          } else {
            execSync('reg add "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehavior /t REG_DWORD /d 0 /f')
          }
          break

        case 'high-performance-power':
          if (enable) {
            try {
              execSync('powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c')
            } catch {
              execSync('powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c')
              execSync('powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c')
            }
          } else {
            execSync('powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e')
          }
          break

        case 'disable-nagle':
          if (enable) {
            execSync('powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-ChildItem -Path \'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\' | ForEach-Object { Set-ItemProperty -Path $_.PSPath -Name TcpAckFrequency -Value 1 -Type DWord -Force; Set-ItemProperty -Path$_.PSPath -Name TCPNoDelay -Value 1 -Type DWord -Force }"')
          } else {
            execSync('powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-ChildItem -Path \'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\' | ForEach-Object { Remove-ItemProperty -Path $_.PSPath -Name TcpAckFrequency -ErrorAction SilentlyContinue; Remove-ItemProperty -Path$_.PSPath -Name TCPNoDelay -ErrorAction SilentlyContinue }"')
          }
          break

        case 'disable-xbox-game-bar':
          if (enable) {
            execSync('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f')
            execSync('reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f')
          } else {
            execSync('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 1 /f')
            execSync('reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 1 /f')
          }
          break

        case 'disable-mouse-accel':
          if (enable) {
            execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f')
            execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d 0 /f')
            execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d 0 /f')
          } else {
            execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 1 /f')
            execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d 6 /f')
            execSync('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d 10 /f')
          }
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
    } catch {
      results['disable-fullscreen-optim'] = false
    }

    try {
      const pwr = execSync('powercfg /getactivescheme').toString().toLowerCase()
      results['high-performance-power'] = pwr.includes('8c5e7fda') || pwr.includes('high performance') || pwr.includes('ultimate performance')
    } catch {
      results['high-performance-power'] = false
    }

    try {
      const dvr = execSync('reg query "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled 2>nul').toString()
      results['disable-xbox-game-bar'] = dvr.includes('0x0')
    } catch {
      results['disable-xbox-game-bar'] = false
    }

    try {
      const ms = execSync('reg query "HKCU\\Control Panel\\Mouse" /v MouseSpeed 2>nul').toString()
      results['disable-mouse-accel'] = /MouseSpeed\s+REG_SZ\s+0/i.test(ms)
    } catch {
      results['disable-mouse-accel'] = false
    }

    try {
      const nagle = execSync('powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$v = Get-ItemProperty -Path \'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\*\' -Name TcpAckFrequency -ErrorAction SilentlyContinue \vert{} Select-Object -ExpandProperty TcpAckFrequency; if ($v -contains 1) { \'true\' } else { \'false\' }"').toString().trim()
      results['disable-nagle'] = nagle === 'true'
    } catch {
      results['disable-nagle'] = false
    }

    return results
  })
}
