import fs from "fs-extra";
import path from "node:path";

const CONFIG_FILES = [
  "package.json",
  ".prettierrc.json",
  ".prettierignore",
  "eslint.config.mjs",
  ".editorconfig",
  "tsconfig.json",
];

const IGNORE_DIRS = new Set(["node_modules", ".yarn"]);

function renameConfigsInDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      renameConfigsInDir(fullPath);
    } else if (CONFIG_FILES.includes(entry.name)) {
      const ext = path.extname(entry.name);
      const base = path.basename(entry.name, ext);
      const newName = ext ? `${base}-template${ext}` : `${base}-template`;
      const newPath = path.join(dir, newName);

      fs.renameSync(fullPath, newPath);
      console.log(`Renamed ${fullPath} → ${newPath}`);
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
  renameConfigsInDir(templatesDir);
}

main();



