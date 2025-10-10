import fs from 'fs-extra'
import path from 'node:path'

const DEFAULT_GITIGNORE = `
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

node_modules

#!.yarn/cache
.pnp.*
/dist

*.env

# macOS
.DS_Store
`;

export async function ensureGitignore(root: string) {
  const gitignorePath = path.join(root, '.gitignore');

  try {
    const exists = await fs.pathExists(gitignorePath);
    if (exists) {
      const stat = await fs.lstat(gitignorePath);
      if (stat.isFile()) return;
      await fs.remove(gitignorePath);
    }

    await fs.outputFile(gitignorePath, DEFAULT_GITIGNORE, { encoding: 'utf8' });
  } catch (e) {
    console.warn('⚠️  Failed to ensure .gitignore:', e);
  }
}
