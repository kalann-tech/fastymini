import fs from 'fs-extra';
import path from 'node:path';
import { templateFiles, type TemplateFile } from '../consts/templateFiles';

interface ProcessTemplateOptions {
  root: string;
  prettier: boolean;
  eslint: boolean;
  editorconfig: boolean;
}

/**
 * Traite tous les fichiers templates selon leur configuration
 */
export async function processTemplateFiles({
  root,
  prettier,
  eslint,
  editorconfig,
}: ProcessTemplateOptions): Promise<void> {
  for (const file of templateFiles) {
    const sourcePath = path.join(root, file.source);
    const targetPath = path.join(root, file.target);

    const sourceExists = await fs.pathExists(sourcePath);
    if (!sourceExists) {
      if (file.condition === 'always') {
        console.warn(`⚠️  Template file not found: ${file.source}`);
      }
      continue;
    }

    // Évaluer la condition
    const shouldInclude = evaluateCondition(file.condition, {
      prettier,
      eslint,
      editorconfig,
    });

    if (shouldInclude) {
      if (file.source !== file.target) {
        await fs.move(sourcePath, targetPath, { overwrite: true });
      }
    } else {
      if (file.actionOnFalse === 'remove') {
        await fs.remove(sourcePath);
        if (await fs.pathExists(targetPath)) {
          await fs.remove(targetPath);
        }
      }
    }
  }
}

/**
 * Évalue une condition basée sur les options
 */
function evaluateCondition(
  condition: TemplateFile['condition'],
  options: {
    prettier: boolean;
    eslint: boolean;
    editorconfig: boolean;
  }
): boolean {
  switch (condition) {
    case 'always':
      return true;
    case 'prettier':
      return options.prettier;
    case 'eslint':
      return options.eslint;
    case 'editorconfig':
      return options.editorconfig;
    default:
      return true;
  }
}
