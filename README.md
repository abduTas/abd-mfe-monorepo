# abd-mfe-monorepo

Turborepo monorepo for the PulseBoard microfrontend stack: Next.js host + two Vite Module Federation remotes with shared Redux state.

## Apps

| Package      | Path         | Stack             | Port | Role                                 |
| ------------ | ------------ | ----------------- | ---- | ------------------------------------ |
| `@abd/host`  | `apps/host`  | Next.js 15        | 3000 | PulseBoard host — `/dashboard/micro` |
| `@abd/shell` | `apps/shell` | Vite + federation | 3001 | Remote UI — `MicroShellApp`          |
| `@abd/state` | `apps/state` | Vite + federation | 3002 | Shared Redux store                   |

## Quick start

```bash
npm install

# All three apps (MFE local dev)
npm run dev:mfe

# Host only
npm run dev
```

Log in at http://localhost:3000/login (`admin@pulseboard.dev` / `password123`), then open `/dashboard/micro`.

Copy env for local host:

```bash
cp .env.example apps/host/.env.local
```

## Scripts (root)

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev:mfe` | Start state + shell + host via Turbo |
| `npm run dev`     | Host only                            |
| `npm run build`   | Build all apps                       |
| `npm run test`    | Test all apps                        |
| `npm run lint`    | Lint all apps                        |

## Production URLs

| App   | URL                              |
| ----- | -------------------------------- |
| Host  | https://abd-poc-demo.vercel.app  |
| Shell | https://abd-mfe-shell.vercel.app |
| State | https://abd-mfe-state.vercel.app |

Deploy order: **state → shell → host**.

See [docs/VERCEL.md](docs/VERCEL.md) for monorepo Vercel configuration.

## Architecture

- Host loads remotes at runtime via ESM (`apps/host/src/lib/mfe/vite-remote-loader.ts`)
- Shell consumes state remote at build time (`NEXT_PUBLIC_MFE_STATE_URL`)
- Three separate Vercel projects, one GitHub repo, Root Directory per app
