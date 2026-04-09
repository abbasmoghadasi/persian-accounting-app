# Coding Conventions

Conventions for the Persian Accounting App monorepo. Follow these in all new code.

---

## Language

- All code, comments, file names, variable names, and documentation: **English**
- All user-facing strings in the UI: **Persian (Farsi)**
- No mixed-language strings

---

## File Naming

| Context | Convention | Example |
|---|---|---|
| React components | PascalCase | `AppShell.tsx`, `Dashboard.tsx` |
| CSS modules | Same name as component | `AppShell.css` |
| Utility files | camelCase | `api.ts`, `env.ts` |
| Backend modules | `<name>.routes.ts`, `<name>.service.ts` | `accounts.routes.ts` |
| Type files | camelCase | `api.ts` in `types/` |
| Docs | kebab-case | `conventions.md`, `ai-workflow.md` |

---

## TypeScript

- Strict mode is enabled in all packages — no `any` unless explicitly justified
- Prefer `interface` for object shapes, `type` for unions and aliases
- Export DTOs (Data Transfer Objects) from `*.service.ts`, not from routes
- Never use non-null assertion (`!`) except where the logic guarantees the value (e.g. insert then fetch by `lastInsertRowid`)

---

## Backend

### Routes

- Route files handle HTTP only: params, body, status codes, reply
- No business logic or SQL in route files
- Always use `success()` / `failure()` from `lib/response.ts`
- Always throw `AppError` — never call `reply.status(...).send({ error: '...' })` directly

```ts
// correct
if (!account) throw new AppError(404, 'Account not found')
return reply.send(success(account))

// wrong
if (!account) return reply.status(404).send({ error: 'Account not found' })
return account
```

### Services

- Services own all database access and business logic
- Accept typed DTO arguments, return typed results
- No HTTP concepts (no `req`, no `reply`, no status codes)

### Database

- All SQL lives in `*.service.ts` — no inline SQL in routes or elsewhere
- Use parameterized queries — never interpolate values into SQL strings
- Schema changes go in `db/migrate.ts` as additional `CREATE TABLE IF NOT EXISTS` or `ALTER TABLE` statements

---

## Frontend

### Components

- One component per file
- Co-locate the CSS file with its component (`AppShell.tsx` + `AppShell.css`)
- Props interface defined in the same file as the component

### API Calls

- All backend calls go through `src/lib/api.ts`
- Never use `fetch` directly in components or pages
- Handle loading and error states explicitly — no silent failures

### Styling

- CSS variables for all colors, spacing units, and radii — defined in `index.css`
- No hardcoded color values in component CSS
- RTL is set globally on `<html>` — do not override `direction` locally unless justified

---

## Git

- Commit messages: `type(scope): short description`
  - Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`
  - Examples: `feat(accounts): add balance field`, `docs: update architecture diagram`
- One logical change per commit
- Never commit `.env` files — only `.env.example`
- Never commit `node_modules/`, `dist/`, or `data/`
