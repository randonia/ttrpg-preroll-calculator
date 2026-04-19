# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A server-side rendered Express.js web app that pre-generates TTRPG dice rolls (e.g., D&D damage rolls) so players can print and use them during gameplay. Users input dice specs like `3d6 4d8`, and the app generates N prerolled results.

## Commands

```bash
npm run watch        # Dev server with hot reload (ts-node via nodemon)
npm run watch:dev    # Dev server with Node debugger on port 9229
npm run build        # tsc + copy public assets to dist/
npm run prettier:check   # Check formatting
npm run prettier:fix     # Auto-fix formatting
```

Production uses PM2 (`ecosystem.config.js`) on port 18890.

## Architecture

**Request flow:**
1. `GET /` → `views/index.ejs` — form where user enters dice specs and preroll count
2. `GET /preroll/:rolls` — view renderer (renders `views/roll_result.ejs`)
3. `GET /api/preroll?rolls=3d6+4d8&number=30` — JSON API used by the view renderer

**Key files:**
- `src/app.ts` — Express entry point; EJS + `express-ejs-layouts` setup, routes, static files from `/public`
- `src/routers/api.ts` — Validates dice specs via regex `/\d{1,2}d\d{1,3}/` and calls `preroll()`
- `src/constants.ts` — `preroll(spec, count)` core dice logic and `NUM_PREROLLS = 30` default
- `layouts/full-width.ejs` — Shared layout (dark theme: `#171a21` bg, `#f1e0c5` text)
- `views/index.ejs` — Form with quick-add buttons for common dice; `quickAddDie()` / `sortConfig()` JS helpers
- `views/roll_result.ejs` — Results page; displays each spec with comma-separated roll values

**Build output:** TypeScript compiles to `dist/src/app.js`; public assets are copied to `dist/`.
