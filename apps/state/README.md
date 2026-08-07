# abd-mfe-state

Redux shared-state **Module Federation remote** (Vite + React).

## Exposes

| Module | Description |
|---|---|
| `sharedState/store` | `getStore()`, actions, types |
| `sharedState/hooks` | `useAppDispatch`, `useAppSelector` |

## Local dev

From monorepo root: `npm run dev:mfe`

Or from this app: `npm run dev` (build + watch + preview on http://localhost:3002).

## Tests

```bash
npm test
```

## Vercel

**Production:** https://abd-mfe-state.vercel.app

**Federation entry:** `https://abd-mfe-state.vercel.app/assets/remoteEntry.js`

Static Vite build (`dist/`). CORS headers in `vercel.json` allow cross-origin loading of `/assets/*` (required for host apps).

### Connect GitHub (auto-deploy on push)

The Vercel GitHub App must have access to this repository:

1. Open [GitHub → Settings → Applications → Vercel → Configure](https://github.com/settings/installations)
2. Under **Repository access**, choose **Only select repositories** and add `abduTas/abd-mfe-state`
3. In the Vercel project, connect the repo: **Settings → Git → Connect Git Repository**

Or from the CLI (after step 2):

```bash
npx vercel git connect https://github.com/abduTas/abd-mfe-state
```

### Host app env

Point consuming apps (e.g. `abd-mfe-shell`) at the deployed remote:

```env
NEXT_PUBLIC_MFE_STATE_URL=https://abd-mfe-state.vercel.app
```
