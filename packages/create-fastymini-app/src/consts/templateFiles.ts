
export interface TemplateFile {
  source: string;
  target: string;
  condition?: 'prettier' | 'eslint' | 'editorconfig' | 'always';
  actionOnFalse?: 'remove' | 'skip';
}

/**
 * Liste de tous les fichiers templates à gérer
 * Note: package-template.json et tsconfig-template.json sont gérés séparément
 */
export const templateFiles: TemplateFile[] = [
  // Fichiers Prettier
  {
    source: '.prettierrc-template.json',
    target: '.prettierrc.json',
    condition: 'prettier',
    actionOnFalse: 'remove',
  },
  {
    source: '.prettierignore-template',
    target: '.prettierignore',
    condition: 'prettier',
    actionOnFalse: 'remove',
  },

  // Fichiers ESLint
  {
    source: 'eslint.config-template.mts',
    target: 'eslint.config.mts',
    condition: 'eslint',
    actionOnFalse: 'remove',
  },

  // Fichiers Git
  {
    source: '.gitignore-template',
    target: '.gitignore',
    condition: 'always',
  },
  {
    source: '.gitattributes',
    target: '.gitattributes',
    condition: 'always',
  },

  // EditorConfig
  {
    source: '.editorconfig-template',
    target: '.editorconfig',
    condition: 'editorconfig',
    actionOnFalse: 'remove',
  },

  // Fichiers d'environnement
  {
    source: '.env.template',
    target: '.env.template',
    condition: 'always',
  },
];

/**
 * Fichiers qui ne doivent jamais être renommés (copiés tels quels)
 */
export const staticFiles: string[] = [
  'esbuild.config.ts',
  'nodemon.json',
  'vitest.config.ts',
  'README.md',
];

/**
 * Fichiers templates gérés manuellement (pas par processTemplateFiles)
 */
export const manuallyManagedFiles: string[] = [
  'package-template.json',   
  'tsconfig-template.json',  
];
