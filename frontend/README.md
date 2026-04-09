# Frontend

React + TypeScript + Vite. Persian-only UI, RTL layout.

## Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite 6 | Dev server + bundler |
| react-router-dom v7 | Client-side routing |
| lucide-react | Icons |

## Folder Structure

```
src/
├── components/
│   └── layout/          # AppShell, TopBar, BottomNav
├── lib/
│   └── api.ts           # Typed fetch wrapper for backend calls
├── pages/               # One file per route
├── types/
│   └── api.ts           # Shared response envelope types
├── router.tsx           # All route definitions
├── App.tsx              # Mounts RouterProvider
├── main.tsx             # React entry point
└── index.css            # Global RTL styles and CSS variables
```

## Dev Server

```bash
npm run dev      # starts on port 5173
```

All `/api/*` requests are proxied to `http://localhost:3000` via Vite config.

## Path Aliases

`@/` maps to `src/`. Example:

```ts
import { api } from '@/lib/api'
import type { ApiResponse } from '@/types/api'
```

## Adding a New Page

1. Create `src/pages/MyPage.tsx`
2. Add route in `src/router.tsx`
3. Add nav entry in `src/components/layout/BottomNav.tsx`
4. Add title entry in `src/components/layout/AppShell.tsx`
