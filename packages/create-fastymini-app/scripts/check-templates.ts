import fs from 'fs-extra';
import path from 'node:path';
import { templateFiles, manuallyManagedFiles } from '../src/consts/templateFiles';

const TEMPLATES_DIR = path.join(__dirname, '../templates');
const TEMPLATE_DIRS = ['default', 'mongo-crud', 'mongo-crud-vitest'];

async function checkTemplateConsistency() {
  console.log('🔍 Vérification de la cohérence des templates...\n');

  let hasErrors = false;

  // Pour chaque fichier template défini
  for (const file of templateFiles) {
    console.log(`📄 Vérification de ${file.source}...`);
    
    const missingIn: string[] = [];
    
    // Vérifier dans chaque template
    for (const templateDir of TEMPLATE_DIRS) {
      const filePath = path.join(TEMPLATES_DIR, templateDir, file.source);
      const exists = await fs.pathExists(filePath);
      
      if (!exists && file.condition === 'always') {
        missingIn.push(templateDir);
        hasErrors = true;
      }
    }
    
    if (missingIn.length > 0) {
      console.log(`  ❌ Manquant dans: ${missingIn.join(', ')}`);
    } else {
      console.log(`  ✅ Présent dans tous les templates`);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Vérifier les fichiers -template qui ne sont pas dans la config
  for (const templateDir of TEMPLATE_DIRS) {
    const templatePath = path.join(TEMPLATES_DIR, templateDir);
    const files = await fs.readdir(templatePath);
    
    const templateFilesInDir = files.filter(f => 
      f.includes('-template') && !f.includes('.backup')
    );
    
    const configuredFiles = templateFiles.map(f => f.source);
    const manualFiles = manuallyManagedFiles;
    const allKnownFiles = [...configuredFiles, ...manualFiles];
    
    const unconfigured = templateFilesInDir.filter(f => !allKnownFiles.includes(f));
    
    if (unconfigured.length > 0) {
      console.log(`⚠️  Fichiers -template non configurés dans ${templateDir}:`);
      unconfigured.forEach(f => console.log(`   - ${f}`));
      console.log('   💡 Ajoutez-les à templateFiles.ts ou manuallyManagedFiles.ts');
      console.log('');
    }
  }

  if (hasErrors) {
    console.log('❌ Des incohérences ont été détectées!\n');
    process.exit(1);
  } else {
    console.log('✅ Tous les templates sont cohérents!\n');
  }
}

checkTemplateConsistency().catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
