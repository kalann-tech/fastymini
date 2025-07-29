import fs from 'fs-extra'
import path from 'node:path'

interface ApplyMongoosePluginOptions {
  root: string
  enabled: boolean
 }

export async function applyMongoosePlugin({ root, enabled }: ApplyMongoosePluginOptions) {
  const mongooseTpl = path.join(root, 'plugins', 'mongoose.config-template.ts')
  const mongooseOut = path.join(root, 'plugins', 'mongoose.config.ts')

  if (enabled) {
    if (await fs.pathExists(mongooseTpl)) await fs.move(mongooseTpl, mongooseOut, { overwrite: true })
  } else {
    await fs.remove(mongooseTpl)
    await fs.remove(mongooseOut)
  }
}
