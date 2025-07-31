# create fastymini app

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-brightgreen.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm">
  <img src="https://img.shields.io/badge/bundler-esbuild-ffcf00.svg" alt="esbuild">
  <img src="https://img.shields.io/badge/code%20style-ESLint-purple.svg" alt="ESLint">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
</p>

A powerful scaffolding tool to quickly create modern **Fastify** projects with **TypeScript**, optimized for fast development and efficient builds using **esbuild**.

## ✨ Features

- 🚀 **Ultra-fast** project scaffolding
- ⚡ **esbuild** for lightning-fast builds
- 🔧 **Modern ESLint** with flat config
- 🎨 **Prettier** integration
- 🗄️ **MongoDB** templates with CRUD operations
- 🧪 **Vitest** testing setup
- 📦 **Multiple package managers** support (npm, yarn, pnpm)
- 🔄 **Hot reload** development experience

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
| `default` | Basic Fastify + TypeScript setup | ⚡ esbuild, 🔧 ESLint, 📁 Static files, 🎨 Prettier |
| `mongo-crud` | Full-stack with MongoDB | 🗄️ MongoDB, 🦾 Mongoose, 🔄 CRUD operations, 📝 Example models |
| `mongo-crud-vitest` | MongoDB + Testing | 🧪 Vitest, 🗄️ MongoDB Memory Server, ✅ Test coverage, 🔬 Test utilities |

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
- **esbuild** v0.25.8 – Lightning-fast bundler
- **nodemon** + **wait-on** + **concurrently** – Hot reloading development
- **Typebox** v0.34.38 – Runtime TypeScript schema validation
- **dotenv** v17.2.1 – Environment variable management
- **@fastify/static** v8.2.0 – Static file serving
- **pino-pretty** v13.0.0 – Beautiful logging in development

### MongoDB Templates Additional Stack:
- **MongoDB** + **Mongoose** v8.16.5 – Database and ODM
- **Vitest** v3.2.4 – Fast testing framework (vitest template only)
- **MongoDB Memory Server** – In-memory database for testing

### Optional Development Tools:
- **ESLint** v9.32.0 – Modern code linting with flat config
- **Prettier** v3.6.2 – Code formatting
- **EditorConfig** – Consistent coding styles across editors
- **TypeScript ESLint** v8.38.0 – TypeScript-specific linting rules

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

1. **Configure your environment variables:**
   ```env
   # Server configuration
   PORT=3000
   NODE_ENV=development
   
   # MongoDB connection string (for MongoDB templates)
   MONGODB_URI=mongodb://localhost:27017/your-database
   
   # Add your custom environment variables here
   API_KEY=your-api-key
   JWT_SECRET=your-jwt-secret
   ```

2. **For MongoDB templates, ensure MongoDB is running:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or install MongoDB locally
   # Follow instructions at: https://docs.mongodb.com/manual/installation/
   ```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build:esbuild` | Build with esbuild (recommended) |
| `npm run build:tsc` | Build with TypeScript compiler |
| `npm start` | Run production build |
| `npm run lint` | Lint code with ESLint |
| `npm run lint:fix` | Lint and auto-fix issues |
| `npm run format` | Format code with Prettier |
| `npm test` | Run tests (vitest template only) |
| `npm run test:watch` | Run tests in watch mode (vitest template only) |
| `npm run test:coverage` | Run tests with coverage report (vitest template only) |

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
import { Type } from '@sinclair/typebox';

const ResponseSchema = Type.Object({
  message: Type.String(),
  timestamp: Type.String()
});

export default async function exampleRoutes(fastify: FastifyInstance) {
  fastify.get('/api/example', {
    schema: {
      response: {
        200: ResponseSchema
      }
    }
  }, async (request, reply) => {
    return { 
      message: 'Hello from FastyMini!',
      timestamp: new Date().toISOString()
    };
  });
}
```

### MongoDB Model with CRUD (mongo templates)
```typescript
// src/models/User.ts
import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);
```

### Controller with TypeBox Validation
```typescript
// src/controllers/userController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { Type } from '@sinclair/typebox';
import { User } from '../models/User';

const CreateUserSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
  age: Type.Optional(Type.Number({ minimum: 0 }))
});

export async function createUser(
  request: FastifyRequest<{ Body: typeof CreateUserSchema }>,
  reply: FastifyReply
) {
  try {
    const user = new User(request.body);
    await user.save();
    return reply.code(201).send(user);
  } catch (error) {
    return reply.code(400).send({ error: 'Failed to create user' });
  }
}
```

## 🤝 Contributing

We welcome contributions to make create-fastymini-app even better! Here's how you can help:

### Development Setup
```bash
# Clone the repository
git clone https://github.com/Kalann-tech/fastymini.git
cd fastymini/packages/create-fastymini-app

# Install dependencies
npm install

# Build the CLI
npm run build

# Test locally
npm run dev
```

### Adding New Templates
1. Create a new template directory in `templates/`
2. Add the template files with `-template` suffix for config files
3. Update the template options in `src/consts/options.ts`
4. Test your template thoroughly

### Reporting Issues
- Use GitHub Issues for bug reports and feature requests
- Provide detailed reproduction steps
- Include your Node.js and npm versions

### Pull Requests
- Fork the repository and create a feature branch
- Follow the existing code style and conventions
- Add tests for new functionality
- Update documentation as needed

## 🙏 Acknowledgments

- **Fastify team** for the amazing framework
- **esbuild team** for the blazing-fast bundler
- **TypeScript team** for making JavaScript development better
- **Community contributors** who help improve this tool

## 📜 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [esbuild](https://esbuild.github.io/) - An extremely fast JavaScript bundler
- [MongoDB](https://docs.mongodb.com/) - Document database
- [Vitest](https://vitest.dev/) - Blazing fast unit test framework
- [TypeBox](https://github.com/sinclairzx81/typebox) - JSON Schema Type Builder

## 📊 Project Stats

- ⭐ **Templates**: 3 production-ready templates
- 📦 **Dependencies**: Minimal and carefully selected
- 🚀 **Build Time**: Sub-second builds with esbuild
- 🧪 **Test Coverage**: 100% for vitest template
- 📝 **TypeScript**: Strict mode enabled by default

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Kalann-tech">KALAAN</a> for the Fastify community
</p>
