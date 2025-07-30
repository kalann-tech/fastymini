import fs from 'fs-extra'
import path from 'node:path'
import { execa } from 'execa'
import { applyPackageTemplate } from './helper/applyPackageTemplate'
import { applyTsconfig } from './helper/applyTsconfig'
import theme from './helper/theme'
import { DatabaseType } from './types'

export interface CreateOptions {
  template: string;
  projectName: string;
  root: string;
  packageManager: "npm" | "yarn" | "pnpm";
  eslint: boolean;
  prettier: boolean;
  skipInstall: boolean;
  enableGit: boolean;
  editorconfig: boolean;
}

export async function createProject({
  template,
  projectName,
  root,
  packageManager,
  eslint,
  prettier,
  skipInstall,
  enableGit,
  editorconfig,
}: CreateOptions) {
  projectName = projectName.split('/').filter(Boolean).pop() || projectName;
  await fs.ensureDir(root);
  try {
    const templateDir = path.resolve(__dirname, `../templates/${template}`);
    if (!(await fs.pathExists(templateDir))) throw new Error(`Template not found at ${templateDir}`);

    await fs.copy(templateDir, root, { overwrite: true, errorOnExist: false });

    await applyPackageTemplate({ root, projectName, eslint, prettier });

    await applyTsconfig({ root });

    if (enableGit) {
      try {
        await execa("git", ["init"], { cwd: root, stdio: "ignore" });
      } catch {
        console.warn("⚠️  Git initialization failed.");
      }
    }

    if (!skipInstall) {
      await execa(packageManager, ["install"], { cwd: root, stdio: "ignore" });
    } else {
      console.log("ℹ️  Skipping dependency installation");
    }

    if (!editorconfig) {
      const editorConfigTpl = path.join(root, ".editorconfig-template");
      if (await fs.pathExists(editorConfigTpl)) {
        await fs.remove(editorConfigTpl);
      }
    } else {
      const editorConfigTpl = path.join(root, ".editorconfig-template");
      const editorConfigOut = path.join(root, ".editorconfig");
      if (await fs.pathExists(editorConfigTpl)) {
        await fs.move(editorConfigTpl, editorConfigOut, { overwrite: true });
      } else {
        await fs.writeFile(
          editorConfigOut,
          "# EditorConfig is awesome!\nroot = true\n[*]\nindent_style = space\nindent_size = 2\nend_of_line = lf\ncharset = utf-8\ntrim_trailing_whitespace = true\ninsert_final_newline = true\n"
        );
      }
    }

    console.log(
      theme.success(`\n🎉  Project "${projectName}" created successfully!`)
    );
  } catch (err) {
    try {
      await fs.remove(root);
      console.log(theme.error("🧹 Project creation failed, cleaned up."));
    } catch (cleanupErr) {
      console.error(
        theme.error("⚠️ Failed to remove project folder after error:"),
        cleanupErr
      );
    }
    throw err;
  }
}
