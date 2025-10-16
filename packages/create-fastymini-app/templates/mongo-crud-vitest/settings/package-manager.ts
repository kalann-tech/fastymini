import { existsSync } from 'fs';

/**
 * Detect the package manager based on lock files present in the project
 * @returns The detected package manager name ('yarn', 'pnpm', 'bun', or 'npm')
 */
export const detectPackageManager = (): string => {
  if (existsSync('yarn.lock')) return 'yarn';
  if (existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (existsSync('bun.lockb')) return 'bun';
  if (existsSync('package-lock.json')) return 'npm';
  return 'npm';
};

/**
 * Get the package manager instance
 */
export const packageManager = detectPackageManager();
