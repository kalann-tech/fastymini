import prompts from "prompts";


export type Option = {
  flag: string;
  description: string;
  prompts?: prompts.PromptObject[];
};

const options: Option[] = [
  {
    flag: "--template <name>",
    description: "Specify a template to use for the project.",
    prompts: [
      {
        type: "select",
        name: "template",
        message: "Choose a template:",
        choices: [
          { title: "Default", value: "default" },
          {
            title: "MongoDB",
            value: "mongo-crud",
            description: "A CRUD template MongoDB integration with mongoose",
          },
          {
            title: "MongoDB with Vitest",
            value: "mongo-crud-vitest",
            description:
              "A CRUD template MongoDB with mongoose and Vitest integration",
          },
        ],
        initial: 0,
      },
    ],
  },
  {
    flag: "--eslint",
    description: "Initialize with ESLint config.",
    prompts: [
      {
        type: "confirm",
        name: "eslint",
        message: "Do you want to initialize with ESLint?",
        initial: true,
      },
    ],
  },
  {
    flag: "--prettier",
    description: "Initialize with Prettier config.",
    prompts: [
      {
        type: "confirm",
        name: "prettier",
        message: "Do you want to initialize with Prettier?",
        initial: false,
      },
    ],
  },
  {
    flag: "--skip-install",
    description: "Explicitly tell the CLI to skip installing packages.",
  },
  {
    flag: "--enable-git",
    description: "Initialize a git repository.",
  },
  {
    flag: "--no-editorconfig",
    description: "Do not create an .editorconfig file.",
  },
  {
    flag: "--package-manager <manager>",
    description: "Specify the package manager to use (npm, yarn, pnpm).",
    prompts: [
      {
        type: "select",
        name: "packageManager",
        message: "Choose a package manager:",
        choices: [
          { title: "npm", value: "npm" },
          { title: "yarn", value: "yarn" },
          { title: "pnpm", value: "pnpm" },
        ],
        initial: 0,
      },
    ],
  },
];  


export default options;


