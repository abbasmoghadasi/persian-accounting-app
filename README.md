# Persian Accounting App

A local-first Persian accounting application for Android and web, with a Persian-only UI and RTL layout.

## Project Structure

```
persian-accounting-app/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Node.js + TypeScript + Fastify
├── docs/              # Documentation
├── package.json       # Root scripts
└── .gitignore
```

## Prerequisites

- Node.js >= 20
- npm >= 10

## Install Dependencies

```bash
npm run install:all
```

## Development

Run frontend and backend concurrently:

```bash
npm run dev
```

Or separately:

```bash
npm run dev:backend    # backend on port 3000
npm run dev:frontend   # frontend on port 5173
```

## Health Check

```bash
curl http://localhost:3000/api/health
```

## Documentation

- [Architecture](docs/architecture.md)

## Planned Features

- Personal accounts and wallets
- Manual transactions
- Persian (Jalali) date support
- Iranian bank SMS parsing
- Shared financial ledgers with change history
