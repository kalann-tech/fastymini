import fs from 'fs-extra'
import path from 'node:path'

interface ApplyTsconfigOptions {
  root: string
}

export async function applyTsconfig({ root }: ApplyTsconfigOptions) {
  const tsconfigTpl = path.join(root, 'tsconfig-template.json')
  const tsconfigOut = path.join(root, 'tsconfig.json')

  if (await fs.pathExists(tsconfigTpl)) {
    await fs.move(tsconfigTpl, tsconfigOut, { overwrite: true })
  }
}
