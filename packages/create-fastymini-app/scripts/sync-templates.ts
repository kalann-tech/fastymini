#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const TEMPLATES_REPO = 'https://github.com/kalann-tech/fastymini-templates.git';
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const TEMP_DIR = path.join(__dirname, '..', '.temp-templates');

async function syncTemplates() {
  console.log('🔄 Synchronisation des templates...');

  try {
    if (fs.existsSync(TEMP_DIR)) {
      fs.removeSync(TEMP_DIR);
    }

    console.log('📥 Téléchargement des templates...');
    execSync(`git clone --depth 1 ${TEMPLATES_REPO} ${TEMP_DIR}`, {
      stdio: 'inherit',
    });

    fs.removeSync(path.join(TEMP_DIR, '.git'));

    if (fs.existsSync(TEMPLATES_DIR)) {
      const backupDir = `${TEMPLATES_DIR}.backup-${Date.now()}`;
      console.log(`💾 Sauvegarde de l'ancien dossier: ${backupDir}`);
      fs.moveSync(TEMPLATES_DIR, backupDir);
    }

    console.log('✨ Mise à jour des templates...');
    fs.moveSync(TEMP_DIR, TEMPLATES_DIR);

    console.log('✅ Templates synchronisés avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
    process.exit(1);
  }
}

syncTemplates();
