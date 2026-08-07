"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { UserSession } from "@/types";
import { QueryProvider } from "@/components/providers/query-provider";

type AppState = {
  session: UserSession | null;
  setSession: (session: UserSession | null) => void;
};

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const value = useMemo(() => ({ session, setSession }), [session]);
  return (
    <QueryProvider>
      <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
    </QueryProvider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppProviders");
  return ctx;
}
