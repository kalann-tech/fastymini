<div align="center">
  <h1>FastyMini</h1>
  <img src="./assets/pixel-cat.png" alt="FastyMini Logo" width="200">
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-brightgreen.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Fastify-5.4.0-black.svg" alt="Fastify">
  <img src="https://img.shields.io/badge/bundler-esbuild-ffcf00.svg" alt="esbuild">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

<p align="center">
  A fast and lightweight framework for building modern web applications with <strong>Fastify</strong> and <strong>TypeScript</strong>
</p>

<p align="center">
  <strong>FastyMini</strong> provides a complete toolkit for building scalable web APIs with minimal setup and maximum performance.
</p>

---

## ✨ Features

- 🚀 **Ultra-fast** development with esbuild bundling
- ⚡ **Lightning-fast** runtime powered by Fastify
- 🔧 **TypeScript-first** with strict type checking
- 📦 **Multiple templates** for different use cases
- 🗄️ **MongoDB integration** with Mongoose ODM
- 🧪 **Testing ready** with Vitest setup
- 🎨 **Code quality** tools (ESLint, Prettier)
- 🔄 **Hot reload** development experience
- 📝 **Schema validation** with TypeBox
- 🛡️ **Type-safe** request/response handling

## 🚀 Quick Start

Get started with FastyMini in seconds:

```bash
# Create a new project
npm create fastymini-app my-app

# Navigate to your project
cd my-app

# Start development
npm run dev
```

Your FastyMini server will be running at `http://localhost:3000` 🎉

## 📦 Packages

This is a monorepo containing the following packages:

| Package | Description | Version |
|---------|-------------|---------|
| [`create-fastymini-app`](./packages/create-fastymini-app) | CLI tool for scaffolding FastyMini projects | ![npm](https://img.shields.io/npm/v/create-fastymini-app) |

## 🎯 Templates

FastyMini provides several production-ready templates:

### 🔰 Default Template
Perfect for getting started with a basic Fastify + TypeScript setup.

**Features:**
- Fastify v5.4.0 with TypeScript
- esbuild for ultra-fast builds
- Static file serving
- Environment configuration
- Hot reload development

```bash
npm create fastymini-app my-app --template default
```

### 🗄️ MongoDB CRUD Template
Full-stack template with MongoDB integration and CRUD operations.

**Features:**
- MongoDB with Mongoose ODM
- Pre-built user model and controllers
- CRUD operation examples
- Type-safe database interactions
- Error handling utilities

```bash
npm create fastymini-app my-app --template mongo-crud
```

### 🧪 MongoDB + Vitest Template
Complete testing setup with MongoDB Memory Server.

**Features:**
- Everything from MongoDB CRUD template
- Vitest for lightning-fast testing
- MongoDB Memory Server for isolated tests
- Test utilities and helpers
- Coverage reporting

```bash
npm create fastymini-app my-app --template mongo-crud-vitest
```

## 🛠️ Development Tools

FastyMini projects come with a modern development toolkit:

### Build Tools
- **esbuild** - Lightning-fast TypeScript bundling
- **TypeScript** - Static type checking and modern JS features
- **nodemon** - File watching and auto-restart
- **concurrently** - Running multiple processes

### Code Quality
- **ESLint** - Modern flat config with TypeScript support
- **Prettier** - Consistent code formatting
- **EditorConfig** - Cross-editor consistency
- **Commitlint** - Conventional commit messages

### Testing (vitest template)
- **Vitest** - Fast unit and integration testing
- **MongoDB Memory Server** - In-memory database for testing
- **Test utilities** - Helper functions for common test scenarios

## 🏗️ Project Structure

A typical FastyMini project follows this structure:

```
my-fastymini-app/
├── src/
│   ├── index.ts          # Application entry point
│   ├── server.ts         # Fastify server configuration
│   ├── plugins/          # Fastify plugins
│   │   ├── config.ts     # Configuration plugin
│   │   └── mongodb.ts    # MongoDB plugin (mongo templates)
│   ├── routes/           # Route handlers
│   │   └── index.ts      # Route registration
│   ├── controllers/      # Business logic (mongo templates)
│   ├── models/           # Database models (mongo templates)
│   ├── interfaces/       # TypeScript interfaces
│   └── helpers/          # Utility functions
├── tests/                # Test files (vitest template)
├── public/               # Static assets
├── dist/                 # Build output
├── esbuild.config.ts     # Build configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
└── package.json          # Dependencies and scripts
```

## 🔧 CLI Usage

The `create-fastymini-app` CLI supports both interactive and non-interactive modes:

### Interactive Mode
```bash
npm create fastymini-app
```

### Non-Interactive Mode
```bash
npm create fastymini-app my-app \
  --template mongo-crud-vitest \
  --package-manager yarn \
  --eslint \
  --prettier \
  --git
```

### Available Options
- `--template` - Choose template (default, mongo-crud, mongo-crud-vitest)
- `--package-manager` - Package manager (npm, yarn, pnpm)
- `--eslint` - Include ESLint configuration
- `--prettier` - Include Prettier configuration
- `--git` - Initialize Git repository
- `--editorconfig` - Include EditorConfig
- `--skip-install` - Skip dependency installation

## 📊 Performance

FastyMini is built for performance:

- **Sub-second builds** with esbuild
- **~50ms startup time** with Fastify
- **Minimal bundle size** with tree-shaking
- **Type-safe runtime** with schema validation
- **Memory efficient** MongoDB connections

## 🧪 Testing

FastyMini projects with the vitest template include comprehensive testing setup:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Example Test
```typescript
// tests/user.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { buildTestServer } from '../src/utils/testServer';

describe('User API', () => {
  let server: any;

  beforeEach(async () => {
    server = await buildTestServer();
  });

  it('should create a new user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com'
    });
  });
});
```

## 🔌 Plugin System

FastyMini leverages Fastify's powerful plugin system:

```typescript
// src/plugins/auth.ts
import fp from 'fastify-plugin';

async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate('authenticate', async (request: FastifyRequest) => {
    // Authentication logic
  });
}

export default fp(authPlugin);
```

## 🌍 Environment Configuration

FastyMini uses environment-based configuration:

```env
# .env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# MongoDB (for mongo templates)
MONGODB_URI=mongodb://localhost:27017/myapp

# Add your custom variables
API_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

## 📖 Examples

### Basic API Route
```typescript
// src/routes/health.ts
import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

const HealthSchema = Type.Object({
  status: Type.String(),
  timestamp: Type.String(),
  uptime: Type.Number()
});

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', {
    schema: {
      response: {
        200: HealthSchema
      }
    }
  }, async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  });
}
```

### MongoDB Model
```typescript
// src/models/User.ts
import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
```bash
# Clone the repository
git clone https://github.com/Kalann-tech/fastymini.git
cd fastymini

# Install dependencies
yarn install

# Build packages
yarn build

# Run tests
yarn test
```

### Monorepo Structure
This project uses Yarn workspaces for managing multiple packages:

```bash
# Add dependency to a specific package
yarn workspace create-fastymini-app add dependency-name

# Run script in a specific package
yarn workspace create-fastymini-app dev

# Run script in all packages
yarn workspaces foreach run build
```

### Code Quality
We use several tools to maintain code quality:

- **Lefthook** - Git hooks for pre-commit checks
- **Commitlint** - Conventional commit message validation
- **ESLint** - Code linting across all packages
- **Prettier** - Code formatting

### Commit Guidelines
We follow conventional commits:

```bash
# Examples
feat: add new template for GraphQL APIs
fix: resolve MongoDB connection issue
docs: update README with new examples
chore: update dependencies
```

## 🛣️ Roadmap

- [ ] 🎯 **GraphQL Template** - Apollo Server integration
- [ ] 🔐 **Authentication Template** - JWT/OAuth2 ready setup
- [ ] 🐳 **Docker Template** - Containerized deployment
- [ ] ☁️ **Serverless Template** - AWS Lambda/Vercel functions
- [ ] 📊 **Monitoring Template** - Prometheus/Grafana integration
- [ ] 🔄 **WebSocket Template** - Real-time communication
- [ ] 📱 **Mobile API Template** - Mobile-optimized responses
- [ ] 🧩 **Microservices Template** - Service mesh ready

## 🙏 Acknowledgments

FastyMini is built on the shoulders of giants:

- **[Fastify](https://fastify.io/)** - The fast and low overhead web framework
- **[esbuild](https://esbuild.github.io/)** - An extremely fast JavaScript bundler
- **[TypeScript](https://typescriptlang.org/)** - JavaScript that scales
- **[MongoDB](https://mongodb.com/)** - The most popular NoSQL database
- **[Vitest](https://vitest.dev/)** - A blazing fast unit test framework

## 📜 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- 📝 **Documentation**: [GitHub Wiki](https://github.com/Kalann-tech/fastymini/wiki)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Kalann-tech/fastymini/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Kalann-tech/fastymini/discussions)
- 📧 **Email**: [rayan.traore03@gmail.com](mailto:rayan.traore03@gmail.com)

## 🌟 Show Your Support

If FastyMini helps you build amazing applications, please give it a ⭐ on GitHub!

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Kalann-tech">KALAAN</a>
</p>

<p align="center">
  <strong>Happy coding! 🚀</strong>
</p>
