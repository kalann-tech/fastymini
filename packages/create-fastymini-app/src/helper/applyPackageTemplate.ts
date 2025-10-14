import fs from 'fs-extra'
import path from 'node:path'
import eslintOthersPackages from '../consts/eslintOthersPackages'
import { processTemplateFiles } from './processTemplateFiles'

interface ApplyPackageOptions {
  root: string
  projectName: string
  eslint: boolean
  prettier: boolean
  editorconfig: boolean
}

export async function applyPackageTemplate({
  root,
  projectName,
  eslint,
  prettier,
  editorconfig,
}: ApplyPackageOptions) {
  const tplPkg = path.join(root, 'package-template.json')
  const outPkg = path.join(root, 'package.json')
  const pkg = await fs.readJson(tplPkg)

  pkg.name = projectName
  
  if (!prettier && pkg.devDependencies) {
    delete pkg.devDependencies['prettier']
    if (pkg.scripts) {
      delete pkg.scripts['format']
    }
  }
  
  if (!eslint && pkg.devDependencies) {
    delete pkg.devDependencies['eslint']

    eslintOthersPackages.forEach(pkgName => {
      if (pkg.devDependencies && pkg.devDependencies[pkgName]) delete pkg.devDependencies[pkgName]
    })
    
    if (pkg.scripts) {
      delete pkg.scripts['lint']
      delete pkg.scripts['lint:fix']
    }
  }

  await fs.writeJson(outPkg, pkg, { spaces: 2 })
  await fs.remove(tplPkg)

  await processTemplateFiles({
    root,
    prettier,
    eslint,
    editorconfig,
  })
}
