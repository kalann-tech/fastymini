import prompts from "prompts";


export type Option = {
  flag: string;
  description: string;
  prompts?: prompts.PromptObject[];
};

const options: Option[] = [
  {
    flag: '--database <type>',
    description: 'Initialize with a database configuration (e.g., mongodb, mysql, postgres).',
    prompts: [
        {
          type: 'select',
          name: 'database',
          message: 'Choose a database:',
          choices: [
            { title: 'MongoDB', value: 'mongodb' },
            { title: 'None', value: null }
          ],
          validate: (value) => value ? true : 'You must select a database type.',
          initial: 0
        }
      ]
    },
    {
      flag: '--template <name>',
      description: 'Specify a template to use for the project.'
    },
  {
    flag: '--eslint',
    description: 'Initialize with ESLint config.',
    prompts: [
      {
        type: 'confirm',
        name: 'eslint',
        message: 'Do you want to initialize with ESLint?',
        initial: true
      }
    ]
  },
  {
    flag: '--prettier',
    description: 'Initialize with Prettier config.',
    prompts: [
      {
        type: 'confirm',
        name: 'prettier',
        message: 'Do you want to initialize with Prettier?',
        initial: false
      }
    ]
  },
  {
    flag: '--unit-test',
    description: 'Initialize with unit testing configuration.',
    prompts: [
      {
        type: 'confirm',
        name: 'unitTest',
        message: 'Do you want to initialize with unit testing configuration?',
        initial: false
      }
    ]
  },
  {
    flag: '--skip-install',
    description: 'Explicitly tell the CLI to skip installing packages.'
  },
  {
    flag: '--enable-git',
    description: 'Initialize a git repository.',
  },
  {
    flag: '--no-editorconfig',
    description: 'Do not create an .editorconfig file.'
  },
  {
    flag: '--package-manager <manager>',
    description: 'Specify the package manager to use (npm, yarn, pnpm).',
    prompts: [
      {
        type: 'select',
        name: 'packageManager',
        message: 'Choose a package manager:',
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'pnpm', value: 'pnpm' }
        ],
        initial: 0
      }
    ]
  }
];  


export default options;


