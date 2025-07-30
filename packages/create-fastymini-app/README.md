# create fastymini app

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-brightgreen.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm">
  <img src="https://img.shields.io/badge/bundler-esbuild-ffcf00.svg" alt="esbuild">
  <img src="https://img.shields.io/badge/code%20style-ESLint-purple.svg" alt="ESLint">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
</p>

A scaffolding tool to quickly create modern **Fastify** projects with **TypeScript**, optimized for fast development and efficient builds using **esbuild**.

## 🚀 Quick Start

Create a new FastyMini project in seconds:

```bash
# Using npm
npm create fastymini-app my-app

# Using yarn
yarn create fastymini-app my-app

# Using pnpm
pnpm create fastymini-app my-app
```

## 📦 Available Templates

| Template | Description | Features |
|----------|-------------|----------|
| `default` | Basic Fastify + TypeScript setup | ⚡ esbuild, 🔧 ESLint, 📁 Static files |
| `mongo-crud` | Full-stack with MongoDB | 🗄️ MongoDB, 🦾 Mongoose, 🔄 CRUD operations |
| `mongo-crud-vitest` | MongoDB + Testing | 🧪 Vitest, 🗄️ MongoDB Memory Server, ✅ Test coverage |

## 🛠️ Usage

### Interactive Mode

```bash
npm create fastymini-app
```

The CLI will prompt you for:
- Project name
- Template selection
- Package manager preference
- Code quality tools (ESLint, Prettier)
- Additional options (Git initialization, EditorConfig)

### Non-Interactive Mode

```bash
npm create fastymini-app my-app --template mongo-crud --package-manager yarn --eslint --prettier --git
```

## 🎛️ CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--template <name>` | Template to use (`default`, `mongo-crud`, `mongo-crud-vitest`) | `default` |
| `--package-manager <pm>` | Package manager (`npm`, `yarn`, `pnpm`) | `npm` |
| `--eslint` | Include ESLint configuration | `false` |
| `--prettier` | Include Prettier configuration | `false` |
| `--skip-install` | Skip dependency installation | `false` |
| `--git` | Initialize Git repository | `false` |
| `--editorconfig` | Include EditorConfig file | `false` |

## 📁 Generated Project Structure

### Default Template
```
my-app/
├── src/
│   ├── index.ts         # Fastify application entry point
│   ├── server.ts        # Server configuration
│   ├── config/          # Configuration files
│   ├── plugins/         # Fastify plugins
│   └── routes/          # Route handlers
├── dist/                # Compiled files (esbuild output)
├── public/              # Static assets
├── settings/            # Build and project settings
├── esbuild.config.ts    # esbuild configuration
├── eslint.config.mjs    # ESLint configuration (optional)
├── tsconfig.json        # TypeScript configuration
├── nodemon.json         # Nodemon configuration
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables
```

### MongoDB Templates
Includes additional directories:
```
├── src/
│   ├── controllers/     # CRUD operation handlers
│   ├── interfaces/      # TypeScript interfaces
│   ├── models/          # Mongoose models and schemas
│   └── helpers/         # Helper functions and utilities
├── tests/               # Test files (vitest template only)
└── vitest.config.ts     # Vitest configuration (vitest template only)
```

## 🔧 Tech Stack

All templates include:

- **Fastify** v5.4.0 – Ultra-fast HTTP framework
- **TypeScript** v5.8.3 – Static typing for Node.js
- **esbuild** v0.25.6 – Lightning-fast bundler
- **nodemon** + **wait-on** + **concurrently** – Hot reloading
- **Typebox** v0.34.37 – TypeScript schema validation
- **dotenv** v17.2.0 – Environment variable management

### MongoDB Templates Additional Stack:
- **MongoDB** + **Mongoose** v8.16.5 – Database and ODM
- **Vitest** v3.2.4 – Fast testing framework (vitest template only)

### Optional Tools:
- **ESLint** v9.31.0 – Modern code linting with flat config
- **Prettier** – Code formatting
- **EditorConfig** – Consistent coding styles

## 🚀 Getting Started After Creation

1. **Navigate to your project:**
   ```bash
   cd my-app
   ```

2. **Start development:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build:esbuild
   npm start
   ```

4. **Run tests** (if using vitest template):
   ```bash
   npm test
   ```

## 📝 Environment Setup

After project creation, make sure to:

1. **Copy environment template:**
   ```bash
   cp .env.template .env
   ```

2. **Configure your environment variables** (especially for MongoDB templates):
   ```env
   # MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/your-database
   
   # Server configuration
   PORT=3000
   NODE_ENV=development
   ```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development mode with hot-reload |
| `npm run build:esbuild` | Build with esbuild (recommended) |
| `npm run build:tsc` | Build with TypeScript compiler |
| `npm start` | Run production build |
| `npm run lint` | Lint code with ESLint |
| `npm test` | Run tests (vitest template only) |

## 🔄 Development Workflow

The development server uses a optimized workflow:

1. **esbuild** compiles TypeScript in watch mode
2. **wait-on** waits for the compiled output
3. **nodemon** runs the application with hot-reload
4. **concurrently** orchestrates all processes

This provides near-instant rebuilds and automatic server restarts.

## 🛡️ Type Safety

All templates include comprehensive TypeScript configurations:

- Strict type checking enabled
- Path mapping for clean imports
- Typebox for runtime schema validation
- Type-safe request/response interfaces

## 🧪 Testing (mongo-crud-vitest template)

The vitest template includes:

- **Vitest** for fast unit testing
- **MongoDB Memory Server** for isolated database testing
- Pre-configured test setup and utilities
- Example test files for CRUD operations

## 🎨 Code Quality

Optional code quality tools:

- **ESLint** with modern flat config
- **Prettier** for consistent formatting
- **EditorConfig** for cross-editor consistency
- Pre-commit hooks (when Git is initialized)

## 📖 Examples

### Basic API Endpoint
```typescript
// src/routes/example.ts
import { FastifyInstance } from 'fastify';

export default async function exampleRoutes(fastify: FastifyInstance) {
  fastify.get('/api/example', async (request, reply) => {
    return { message: 'Hello from FastyMini!' };
  });
}
```

### MongoDB Model (mongo templates)
```typescript
// src/models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

## 📜 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related

- [Fastify Documentation](https://www.fastify.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [esbuild Documentation](https://esbuild.github.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vitest Documentation](https://vitest.dev/)

---

<p align="center">
  Made with ❤️ for the Fastify community
</p>
