import fs from 'fs-extra'
import path from 'node:path'
import { DatabaseType } from '../types'
import { applyMongoosePlugin } from '../plugins/mongoose'

interface ApplyPackageOptions {
  root: string
  projectName: string
  eslint: boolean
  prettier: boolean
  database: DatabaseType
}

export async function applyPackageTemplate({
  root,
  projectName,
  eslint,
  prettier,
  database,
}: ApplyPackageOptions) {
  const tplPkg = path.join(root, 'package-template.json')
  const outPkg = path.join(root, 'package.json')
  const pkg = await fs.readJson(tplPkg)

  pkg.name = projectName
  if (!eslint && pkg.devDependencies) delete pkg.devDependencies['eslint']
  if (!prettier && pkg.devDependencies) delete pkg.devDependencies['prettier']

  
  await fs.writeJson(outPkg, pkg, { spaces: 2 })
  await fs.remove(tplPkg)

  const prettierConfigTpl = path.join(root, '.prettierrc-template.json')
  const prettierIgnoreTpl = path.join(root, '.prettierignore-template')

  if (prettier) {
    if (await fs.pathExists(prettierConfigTpl)) {
      await fs.move(prettierConfigTpl, path.join(root, '.prettierrc'), { overwrite: true })
    }
    if (await fs.pathExists(prettierIgnoreTpl)) {
      await fs.move(prettierIgnoreTpl, path.join(root, '.prettierignore'), { overwrite: true })
    }
  } else {
    await fs.remove(prettierConfigTpl)
    await fs.remove(prettierIgnoreTpl)
  }

  const eslintTpl = path.join(root, 'eslint.config-template.mjs')
  const eslintOut = path.join(root, 'eslint.config.mjs')

  if (eslint) {
    if (await fs.pathExists(eslintTpl)) {
      await fs.move(eslintTpl, eslintOut, { overwrite: true })
    }
  } else {
    await fs.remove(eslintTpl)
    await fs.remove(eslintOut)
  }

  const useMongoose = Boolean(database === 'mongodb')
  if (useMongoose) pkg.dependencies['mongoose'] = 'latest'
  await applyMongoosePlugin({ root, enabled: useMongoose })

}
