"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "@/types/mfe-store";
import { RemoteShellLoader } from "@/components/mfe/remote-shell-loader";
import { SharedStateDemo } from "@/components/mfe/shared-state-demo";
import { loadViteRemoteExpose } from "@/lib/mfe/vite-remote-loader";
import { MFE_STATE_ENTRY, MFE_STATE_URL } from "@/lib/mfe/remote-urls";

export function MicroPageClient() {
  const [store, setStore] = useState<Store<RootState> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const timeoutId = window.setTimeout(() => {
      if (!cancelled) {
        setError(
          `Timed out loading shared state remote (${MFE_STATE_URL}). Check that abd-mfe-state is deployed and NEXT_PUBLIC_MFE_STATE_URL is a plain (non-Sensitive) Vercel env var.`,
        );
      }
    }, 15_000);

    loadViteRemoteExpose<{ getStore: () => Store<RootState> }>(MFE_STATE_ENTRY, "./store")
      .then((module) => {
        if (cancelled) return;
        window.clearTimeout(timeoutId);
        setStore(module.getStore());
      })
      .catch((err: Error) => {
        if (cancelled) return;
        window.clearTimeout(timeoutId);
        setError(err.message);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (error) {
    return (
      <div className="card border-rose-900/50 bg-rose-950/30 p-4 text-sm text-rose-200">
        <p className="font-semibold">Shared state remote unavailable</p>
        <p className="mt-2">{error}</p>
        <p className="mt-2 text-rose-300/80">
          Production: set <code className="text-rose-100">NEXT_PUBLIC_MFE_STATE_URL</code> and{" "}
          <code className="text-rose-100">NEXT_PUBLIC_MFE_SHELL_URL</code> in Vercel as{" "}
          <strong>plain</strong> env vars (not Sensitive), then redeploy. Local: from the monorepo
          root run <code className="text-rose-100">npm run dev:mfe</code> (state on :3002, shell on
          :3001, host on :3000).
        </p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="card animate-pulse p-6 text-sm text-slate-400">Loading shared state…</div>
    );
  }

  return (
    <Provider store={store}>
      <div className="space-y-6">
        <SharedStateDemo />
        <RemoteShellLoader />
      </div>
    </Provider>
  );
}
