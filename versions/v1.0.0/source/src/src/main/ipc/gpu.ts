import { ipcMain } from 'electron'
import { execSync } from 'child_process'

export function registerGPUHandlers(): void {
  ipcMain.handle('gpu:info', async () => {
    try {
      const out = execSync('nvidia-smi --query-gpu=name,temperature.gpu,utilization.gpu,utilization.memory,memory.total,memory.used,driver_version --format=csv,noheader,nounits').toString().trim()
      const [name, temp, gpuUtil, memUtil, memTotal, memUsed, driver] = out.split(', ')
      return { success: true, name, temp: Number(temp), gpuUtil: Number(gpuUtil), memUtil: Number(memUtil), memTotal: Number(memTotal), memUsed: Number(memUsed), driver }
    } catch {
      return { success: false, error: 'nvidia-smi not available' }
    }
  })

  ipcMain.handle('gpu:set-power-limit', async (_event, watts: number) => {
    try {
      execSync(`nvidia-smi -pl ${watts}`)
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })
}
