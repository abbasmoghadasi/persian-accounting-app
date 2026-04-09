# Backend

Node.js + TypeScript + Fastify. Local REST API backed by SQLite.

## Stack

| Tool | Purpose |
|---|---|
| Fastify v5 | HTTP framework |
| TypeScript | Type safety |
| better-sqlite3 | Embedded SQLite driver |
| dotenv | Environment config |
| @fastify/cors | CORS support |
| tsx | Dev-time TypeScript runner |

## Folder Structure

```
src/
├── app.ts               # App factory: registers plugins, routes, error handler
├── index.ts             # Entry point: runs migrations, starts server
├── config/
│   └── env.ts           # Typed environment config with defaults
├── db/
│   ├── client.ts        # SQLite singleton (WAL mode, foreign keys on)
│   └── migrate.ts       # Schema creation (CREATE TABLE IF NOT EXISTS)
├── lib/
│   ├── errors.ts        # AppError class
│   └── response.ts      # success() and failure() response helpers
└── modules/
    ├── accounts/        # routes.ts + service.ts
    ├── transactions/    # routes.ts + service.ts
    ├── ledgers/         # routes.ts + service.ts
    └── sms/             # routes.ts + service.ts
```

## Dev Server

```bash
cp .env.example .env    # first time only
npm run dev             # starts on port 3000 with hot reload
```

## API Response Convention

All responses follow the same envelope:

```json
// success
{ "success": true, "data": { ... } }

// error
{ "success": false, "error": { "message": "...", "code": "OPTIONAL_CODE" } }
```

## Error Handling

Throw `AppError` anywhere in a route or service. The global error handler in `app.ts` catches it and returns the correct HTTP status and `failure()` envelope automatically.

```ts
import { AppError } from '../../lib/errors'

throw new AppError(404, 'Account not found')
throw new AppError(400, 'Invalid input', 'INVALID_INPUT')
```

## Adding a New Module

1. Create `src/modules/<name>/` with `<name>.routes.ts` and `<name>.service.ts`
2. Register the plugin in `app.ts` with the `/api/<name>` prefix
3. Add tables to `db/migrate.ts` if needed
