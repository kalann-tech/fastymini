#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import packageJSON from '../package.json';
import options from './consts/options';
import { loading } from './helper/loading';
import { notifyUpdate } from './helper/updateNotifier';
import prompts from 'prompts';
import { getOptionName } from './utils/getOptionName';
import theme from './helper/theme';
import { printTitle, textTittle } from './helper/printTitle';
import { createProject } from './create';
import path from 'node:path';

async function main() {
  await notifyUpdate();
  const program = new Command(packageJSON.name)
    .version(packageJSON.version)
    .description(packageJSON.description)
    .argument('[directory]')
    .usage('[directory] [options]')
    .hook('preAction', () => printTitle(packageJSON.name))
    .addHelpText('beforeAll', textTittle(`${packageJSON.name} CLI`));

  options.forEach(({ flag, description }) => {
    program.option(flag, description);
  });

  program.action(async (directory) => {
    const opts = program.opts();
    let projectName = directory;
    if (!projectName) {
      const { directory: dir } = await prompts({
        type: 'text', name: 'directory',
        message: 'Your project name:', initial: 'my-fastymini-app',
        validate: v => v.length > 0 ? true : 'Required'
      }, { onCancel: () => process.exit(1) });
      projectName = dir;
    }
    const root = path.resolve(process.cwd(), projectName);

    if (await fs.pathExists(root)) {
      console.error(
        theme.error(`Directory "${projectName}" already exists. Please choose a different name.`)
      )
      process.exit(1)
    }

    for (const optDef of options.filter(o => o.prompts)) {
      const name = getOptionName(optDef.flag);
      if (opts[name] == null) {
        Object.assign(opts, await prompts(optDef.prompts!, { onCancel: () => process.exit(1) }));
      }
    }
    const spinner = loading(`Creating project "${projectName}"…`);
    try {
      spinner.start();
      await createProject({ projectName, root, packageManager: opts.packageManager, eslint: opts.eslint, prettier: opts.prettier, skipInstall: opts.skipInstall, enableGit: opts.enableGit, editorconfig: opts.editorconfig , template: opts.template || 'default' });
      spinner.succeed(`Project "${projectName}" created successfully!`);
      console.log(theme.warning('Note: Dont forget to change env.template to .env and fill it with your good credentials. \nDon\'t forget to see the README.md for more information.'));
      console.log(`\nNext steps:\n  cd ${projectName}\n  ${opts.packageManager || 'npm'} ${opts.packageManager === 'npm' ? 'run ' : ''}dev`);
    } catch (err) {
      spinner.fail('Project creation failed.');
      console.error(err);
      process.exit(1);
    }
  });

  await program.parseAsync(process.argv);
}

main().catch(err => {
  console.error(theme.error('Unexpected error:'), err);
  process.exit(1);
});
