import { ipcMain, app } from 'electron'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const CONFIG_PATH = join(app.getPath('userData'), 'tweakr.enc')
const KEY = Buffer.from('tweakr-aes-key-32bytes-padding!!', 'utf8').slice(0, 32)

function encrypt(data: string): string {
  const iv = randomBytes(16)
  const cipher = createCipheriv('aes-256-cbc', KEY, iv)
  return iv.toString('hex') + ':' + cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
}

function decrypt(data: string): string {
  const [ivHex, encrypted] = data.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const decipher = createDecipheriv('aes-256-cbc', KEY, iv)
  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
}

export function registerConfigHandlers(): void {
  ipcMain.handle('config:load', async () => {
    try {
      if (!existsSync(CONFIG_PATH)) return { success: true, config: {} }
      const raw = readFileSync(CONFIG_PATH, 'utf8')
      return { success: true, config: JSON.parse(decrypt(raw)) }
    } catch (err: any) {
      return { success: false, error: err.message, config: {} }
    }
  })

  ipcMain.handle('config:save', async (_event, config: Record<string, unknown>) => {
    try {
      writeFileSync(CONFIG_PATH, encrypt(JSON.stringify(config)), 'utf8')
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })
}
