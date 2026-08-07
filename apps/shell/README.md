# abd-mfe-shell

Generic **Module Federation remote shell** (Vite + React).

## Exposes

`remoteShell/MicroShellApp`

## Consumes

`sharedState/store`, `sharedState/hooks` from abd-mfe-state

## Local dev

Start **state** first, then shell, then host — or from monorepo root:

```bash
cd ../../..   # monorepo root
npm run dev:mfe
```

Or per-app from `apps/state`, `apps/shell`, `apps/host` with `npm run dev`.

```env
NEXT_PUBLIC_MFE_STATE_URL=http://localhost:3002
```

## Vercel

**Production:** https://abd-mfe-shell.vercel.app

**Federation entry:** `https://abd-mfe-shell.vercel.app/assets/remoteEntry.js`

Set at build time:

```env
NEXT_PUBLIC_MFE_STATE_URL=https://abd-mfe-state.vercel.app
```
