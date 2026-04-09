# ADR-001: Backend Architecture

**Date:** 2026-04-09
**Status:** Accepted

---

## Context

We are building a local-first Persian accounting application. The backend must run entirely on the user's machine, persist data locally, and expose a clean REST API for the frontend. No cloud dependency is acceptable in the MVP phase.

Key constraints:
- Runs locally on Android (via Node.js wrapper) and desktop/web
- No external database server — database must be an embedded file
- Codebase must be readable and extendable by a single developer
- Business logic will grow incrementally: accounts, transactions, shared ledgers, SMS parsing

---

## Decisions

### 1. Runtime: Node.js + TypeScript

**Decision:** Use Node.js with TypeScript compiled via `tsx` for development.

**Reason:** The frontend is already TypeScript + React. Sharing a single language across the stack removes context-switching, allows sharing types in the future, and keeps the toolchain minimal.

`tsx` is used for development (`tsx watch`) so there is no need for a separate `ts-node` or compile-watch step. Production uses `tsc` to emit plain JavaScript.

---

### 2. HTTP Framework: Fastify v5

**Decision:** Use Fastify instead of Express.

**Reason:**
- Fastify has first-class TypeScript support with typed route generics
- Built-in schema validation via TypeBox (to be added later)
- Significantly faster than Express under load
- Plugin system (`FastifyPluginAsync`) naturally maps to the modular folder structure chosen here
- Each domain module is registered as a Fastify plugin with a route prefix, so modules are isolated and independently testable

---

### 3. Database: SQLite via `better-sqlite3`

**Decision:** Use SQLite as the embedded database, accessed through the `better-sqlite3` driver.

**Reason:**
- No separate database process — the entire database is a single file
- `better-sqlite3` is synchronous, which eliminates async boilerplate for simple read/write operations
- WAL (Write-Ahead Logging) mode is enabled for better concurrent read performance
- Foreign key enforcement is turned on at the connection level
- The database file lives in `backend/data/` and is git-ignored

**Trade-off:** SQLite has limitations around concurrent writes and complex queries. If the app outgrows these, the service layer can be swapped to PostgreSQL with minimal route changes, since all SQL is isolated in `*.service.ts` files.

---

### 4. Module Structure: Feature-based

**Decision:** Organize code by domain feature, not by layer.

```
modules/
  accounts/
    accounts.routes.ts
    accounts.service.ts
  transactions/
    transactions.routes.ts
    transactions.service.ts
  ...
```

**Reason:** Layer-based organization (all controllers in one folder, all services in another) causes friction when a feature spans multiple files — you must jump between distant directories. Feature-based grouping keeps all code for one domain together and makes it trivial to add, remove, or hand off a feature.

Each module has two responsibilities:
- `routes.ts` — HTTP interface (params, body, status codes)
- `service.ts` — database queries and business logic

---

### 5. Environment Config: `dotenv` with typed wrapper

**Decision:** Load `.env` via `dotenv` and re-export a typed `env` object from `src/config/env.ts`.

**Reason:** Raw `process.env` access scattered across the codebase is fragile. A single typed config module:
- Makes all config discoverable in one place
- Provides safe defaults so the app runs without a `.env` file
- Allows future validation (e.g. with `zod`) to be added in one location

`.env.example` is committed to the repository. `.env` is git-ignored.

---

### 6. App Factory Pattern

**Decision:** Separate `app.ts` (factory) from `index.ts` (entry point).

```
index.ts  →  buildApp()  →  app.listen()
```

**Reason:** The factory function returns a configured Fastify instance without starting the server. This makes the app testable in isolation — tests can call `buildApp()` and inject requests without binding a port.

---

## Schema: Initial Tables

| Table | Purpose |
|---|---|
| `accounts` | Personal wallets and bank accounts |
| `transactions` | Individual income/expense entries linked to an account |
| `ledgers` | Shared financial ledger between two people |
| `ledger_entries` | Individual entries within a shared ledger |
| `sms_logs` | Raw and parsed SMS messages from Iranian banks |

---

## Consequences

- Adding a new domain feature = add a folder under `modules/`, write routes + service, register in `app.ts`
- All database access goes through `getDb()` — no ORM, plain SQL
- Schema changes require new migration statements appended to `migrate.ts`
- The `sms.service.ts` parser is a stub — the real parsing logic will be implemented as a separate ADR when SMS patterns are defined
