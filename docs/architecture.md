# Architecture

## Overview

Persian Accounting App is a local-first monorepo. All data stays on the user's device — no cloud dependency in the MVP phase. The repository contains two runnable applications that communicate over HTTP during development.

| Package | Tech | Port |
|---|---|---|
| `frontend/` | React + TypeScript + Vite | 5173 |
| `backend/` | Node.js + TypeScript + Fastify | 3000 |

See diagram: [Project Overview](diagrams/01-project-overview.md)

---

## Frontend

The frontend is a React SPA with RTL layout and Persian-only UI. Routing is handled by `react-router-dom`. All pages share a common shell (top bar + bottom navigation).

During development, Vite proxies all `/api/*` requests to the backend so no CORS configuration is needed on the client side.

**Pages:** Dashboard · Transactions · Accounts · Ledger · Settings

---

## Backend

The backend is a Fastify HTTP server organized by domain feature. Each module owns its routes and service layer. The app factory (`app.ts`) registers all modules as Fastify plugins with a `/api/<module>` prefix.

See diagram: [Backend Module Structure](diagrams/02-backend-modules.md)

### Modules

| Module | Prefix | Responsibility |
|---|---|---|
| accounts | `/api/accounts` | Personal wallets and bank accounts |
| transactions | `/api/transactions` | Individual income/expense records |
| ledgers | `/api/ledgers` | Shared financial ledgers between two people |
| sms | `/api/sms` | Receive and parse Iranian bank SMS messages |

### Config

All environment variables are loaded via `dotenv` and re-exported as a typed object from `src/config/env.ts`. The app runs with safe defaults and does not require a `.env` file.

---

## Database

SQLite is used as the embedded database. The file is stored at `backend/data/accounting.db` and is git-ignored. The schema is created automatically on first run via `db/migrate.ts`.

- WAL mode enabled for better read concurrency
- Foreign keys enforced at connection level
- All SQL is written directly in `*.service.ts` — no ORM

See diagram: [Database Schema](diagrams/03-database-schema.md)

---

## Request Lifecycle

A browser request goes through Vite's dev proxy, hits Fastify, which queries SQLite and returns JSON. In production, the frontend is served as static files and the proxy is replaced by a reverse proxy or direct API calls.

See diagram: [Request Flow](diagrams/04-request-flow.md)

---

## Architecture Decision Records

| ADR | Decision |
|---|---|
| [ADR-001](adr/001-backend-architecture.md) | Backend architecture: Fastify, SQLite, feature modules, app factory |
