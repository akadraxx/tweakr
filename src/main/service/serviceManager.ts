import { execSync } from 'child_process'
import { join } from 'path'
import { app } from 'electron'

export class ServiceManager {
  private serviceName = 'TweakrWatchdog'

  install(): void {
    const svcPath = join(app.getAppPath(), '..', 'windows-service', 'service.js')
    execSync(`node "${svcPath}" install`)
  }

  uninstall(): void {
    execSync(`sc stop ${this.serviceName}`)
    execSync(`sc delete ${this.serviceName}`)
  }

  status(): string {
    try {
      const out = execSync(`sc query ${this.serviceName}`).toString()
      return out.includes('RUNNING') ? 'running' : 'stopped'
    } catch {
      return 'not-installed'
    }
  }
}
