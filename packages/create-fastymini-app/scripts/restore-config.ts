import fs from "fs-extra";
import path from "node:path";


const TEMPLATE_FILES = [
  { original: "package.json", template: "package-template.json" },
  { original: ".prettierrc", template: ".prettierrc-template" },
  { original: ".prettierignore", template: ".prettierignore-template" },
  { original: "eslint.config.mjs", template: "eslint.config-template.mjs" },
  { original: ".editorconfig", template: ".editorconfig-template" },
  { original: "tsconfig.json", template: "tsconfig-template.json" },
];

const IGNORE_DIRS = new Set(["node_modules", ".yarn"]);

function restoreInDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      restoreInDir(fullPath);
    } else {
      const mapping = TEMPLATE_FILES.find((f) => f.template === entry.name);
      if (mapping) {
        const newPath = path.join(dir, mapping.original);
        fs.renameSync(fullPath, newPath);
        console.log(`Restored ${fullPath} → ${newPath}`);
      }
    }
  }
}

function main() {
  const templatesDir = path.resolve(process.cwd(), "templates");
  if (
    !fs.existsSync(templatesDir) ||
    !fs.lstatSync(templatesDir).isDirectory()
  ) {
    console.error(`Le dossier templates/ est introuvable à : ${templatesDir}`);
    process.exit(1);
  }
  restoreInDir(templatesDir);
}

main();



