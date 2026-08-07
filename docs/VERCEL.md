# Vercel monorepo setup

One GitHub repo (`abduTas/abd-mfe-monorepo`), **three Vercel projects**. Each project points at a different Root Directory.

## Project configuration

| Vercel project | Root Directory | Production URL |
|---|---|---|
| abd-poc-demo (host) | `apps/host` | https://abd-poc-demo.vercel.app |
| abd-mfe-shell | `apps/shell` | https://abd-mfe-shell.vercel.app |
| abd-mfe-state | `apps/state` | https://abd-mfe-state.vercel.app |

### Steps (per project)

1. Vercel Dashboard → Project → **Settings → Git**
2. Connect repository: `abduTas/abd-mfe-monorepo`
3. Set **Root Directory** to `apps/host`, `apps/shell`, or `apps/state`
4. Confirm `installCommand` in each app's `vercel.json` is `cd ../.. && npm ci`

## Environment variables

**Important:** `NEXT_PUBLIC_*` variables must be **plain** env vars (not "Sensitive"). Sensitive marking redacts values to `[SENSITIVE]` in client bundles and breaks Module Federation.

### Host (`apps/host`)

| Variable | Production value |
|---|---|
| `NEXT_PUBLIC_MFE_SHELL_URL` | `https://abd-mfe-shell.vercel.app` |
| `NEXT_PUBLIC_MFE_STATE_URL` | `https://abd-mfe-state.vercel.app` |

### Shell (`apps/shell`)

| Variable | Production value |
|---|---|
| `NEXT_PUBLIC_MFE_STATE_URL` | `https://abd-mfe-state.vercel.app` |

Baked into the shell bundle at **build time**. Rebuild shell after changing this URL.

### State (`apps/state`)

No env vars required. CORS headers are in `apps/state/vercel.json`.

## Deploy order

1. **state** — no upstream deps
2. **shell** — needs state URL in env
3. **host** — needs shell + state URLs in env

## GitHub Actions secrets

For CI deploy jobs (see `.github/workflows/ci-cd.yml`):

| Secret | Used by |
|---|---|
| `VERCEL_TOKEN` | All deploy jobs |
| `VERCEL_ORG_ID` | All deploy jobs |
| `VERCEL_PROJECT_ID_HOST` | Host deploy |
| `VERCEL_PROJECT_ID_SHELL` | Shell deploy |
| `VERCEL_PROJECT_ID_STATE` | State deploy |

### GitHub Variables (not secrets)

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_MFE_SHELL_URL` | `https://abd-mfe-shell.vercel.app` |
| `NEXT_PUBLIC_MFE_STATE_URL` | `https://abd-mfe-state.vercel.app` |

## Verification

```bash
curl -I https://abd-mfe-state.vercel.app/assets/remoteEntry.js
curl -I https://abd-mfe-shell.vercel.app/assets/remoteEntry.js

# Shell must reference production state, not localhost:
curl -s https://abd-mfe-shell.vercel.app/assets/remoteEntry.js | grep abd-mfe-state
```
