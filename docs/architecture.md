# Architecture

## Overview

This is a monorepo containing two main packages:

- `frontend/` — React + TypeScript + Vite
- `backend/` — Node.js + TypeScript + Fastify
- `docs/` — Documentation

## Frontend / Backend Communication

- Frontend runs on port `5173`
- Backend runs on port `3000`
- All `/api/*` requests are proxied by Vite to the backend during development

## Database

- SQLite for MVP — stored as a local file
- Can be replaced with a more capable database later

## Planned Features

- Personal accounts and wallets
- Manual transactions
- Persian (Jalali) date support
- Iranian bank SMS parsing
- Shared financial ledgers with change history
