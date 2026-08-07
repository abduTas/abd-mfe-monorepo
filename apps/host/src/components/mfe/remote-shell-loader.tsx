"use client";

import { type ComponentType, useEffect, useState } from "react";
import { MfeErrorBoundary } from "@/components/mfe/mfe-error-boundary";
import { loadViteRemoteExpose } from "@/lib/mfe/vite-remote-loader";
import { MFE_SHELL_ENTRY } from "@/lib/mfe/remote-urls";

export function RemoteShellLoader() {
  const [RemoteApp, setRemoteApp] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadViteRemoteExpose<ComponentType>(MFE_SHELL_ENTRY, "./MicroShellApp")
      .then((component) => {
        if (!component) throw new Error("remoteShell/MicroShellApp returned empty module");
        setRemoteApp(() => component);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="card border-rose-900/50 bg-rose-950/30 p-4 text-sm text-rose-200">
        <p className="font-semibold">Remote shell failed to load</p>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  if (!RemoteApp) {
    return (
      <div className="card animate-pulse p-6 text-sm text-slate-400">Loading remote shell…</div>
    );
  }

  return (
    <MfeErrorBoundary>
      <RemoteApp />
    </MfeErrorBoundary>
  );
}
