# PulseBoard - Next.js App Router Teaching Project

Production-style SaaS dashboard sample that demonstrates core and advanced Next.js concepts using TypeScript + Tailwind CSS.

## Architecture decisions

- App Router with route groups:
  - `(marketing)` for public pages (`/home`, `/blog`, `/internals`)
  - `(auth)` for login page
  - `(dashboard)` for protected product dashboard
- API backend lives inside the same app under `src/app/api/*` using route handlers.
- Mock DB (`src/lib/mock-db.ts`) keeps the demo self-contained; easy to swap for a real DB layer.
- Middleware handles auth redirects centrally for protected routes.

## Rendering strategy choices

- **SSR (dynamic)**: `src/app/(dashboard)/dashboard/page.tsx` uses `dynamic = "force-dynamic"` for request-time rendering.
- **SSG**: `src/app/(marketing)/blog/page.tsx` uses static generation for predictable content.
- **ISR**: `src/app/(marketing)/blog/[slug]/page.tsx` and `src/app/(dashboard)/dashboard/products/page.tsx` revalidate periodically.
- **CSR**: `src/components/dashboard/stats-live.tsx` fetches client-side after hydration.

## Build internals quick guide

- `next build` creates optimized server/client bundles and route manifests.
- `.next/` includes server output, client chunks, and prerender artifacts.
- Tree shaking removes unused imports from production bundles.
- Route-based splitting ensures users download only JS for visited routes.

## State management strategy

- `AppProviders` uses React Context for app-wide session state.
- Keep state local by default; lift to context only when distant components share it.
- React Query handles **server-state** (API data), while Context handles lightweight app UI/session state.
- **Microfrontends**: federated Redux store from `abd-mfe-state` via Module Federation (see below).

## Microfrontends (Module Federation + Redux)

This app is the **host** in the `abd-mfe-monorepo` Turborepo. See the [root README](../../../README.md) and [docs/VERCEL.md](../../../docs/VERCEL.md).

| Package | Path | Role | Port |
|---|---|---|---|
| `@abd/host` | `apps/host` (this app) | Host — `/dashboard/micro` | 3000 |
| `@abd/shell` | `apps/shell` | Remote UI — `MicroShellApp` | 3001 |
| `@abd/state` | `apps/state` | Shared Redux store | 3002 |

**Local dev** from monorepo root:

```bash
npm install
npm run dev:mfe
```

Or copy env: `cp .env.example apps/host/.env.local`

```env
NEXT_PUBLIC_MFE_SHELL_URL=http://localhost:3001
NEXT_PUBLIC_MFE_STATE_URL=http://localhost:3002
```

Deploy order: **state → shell → host**.

## React Query + Axios integration

- `src/lib/http-client.ts`: centralized Axios instance.
- `src/components/providers/query-provider.tsx`: wraps app with `QueryClientProvider`.
- `src/hooks/use-stats-query.ts`: query hook for live stats.
- `src/hooks/use-products-query.ts`: query + mutation hooks for products.
- `src/components/dashboard/products-client-manager.tsx`: client CRUD demo with invalidation.

## Deployment notes

- **Vercel**: easiest deployment path with first-class Next.js support.
- **Self-hosted**: run `npm run build && npm run start` in a Node environment.
- Store secrets in environment variables (`process.env.*`), never in source code.

## Testing

Unit tests use **Jest** and **React Testing Library**.

```bash
npm run test          # run once
npm run test:watch    # watch mode
npm run test:ci       # CI mode with coverage
```

Test utilities live in `src/test/` (custom `render` with `QueryProvider`, mocks for `next/navigation` and `next/headers`).

## Git hooks (Husky)

On **pre-push**, Husky runs formatting, lint, and tests:

```bash
npm run format:check
npm run lint
npm run test
```

Format all files locally:

```bash
npm run format
```

## CI/CD (GitHub Actions + Vercel)

Workflow: [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml)

- **Pull requests to `main`**: format check, lint, test, and `next build` (no deploy).
- **Push to `main`**: format check, lint, test, then a single Vercel build + deploy (no duplicate build job).

### Required GitHub Actions secrets

Add these under **GitHub repo → Settings → Secrets and variables → Actions**:

| Secret              | How to obtain                                                                   |
| ------------------- | ------------------------------------------------------------------------------- |
| `VERCEL_TOKEN`      | Create at [vercel.com/account/tokens](https://vercel.com/account/tokens)        |
| `VERCEL_ORG_ID`     | From `.vercel/project.json` after `npx vercel link`, or Vercel project settings |
| `VERCEL_PROJECT_ID` | Same source as `VERCEL_ORG_ID`                                                  |

```bash
cat .vercel/project.json
```

If Vercel Git integration also auto-deploys on push, disable automatic deployments in Vercel project settings to avoid duplicate deploys with the GitHub Action.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo credentials:

- `admin@pulseboard.dev`
- `password123`
