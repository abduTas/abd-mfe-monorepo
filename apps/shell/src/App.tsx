import React from "react";
import MicroShellApp from "@/components/MicroShellApp";

export default function App() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl space-y-6 p-8">
      <header>
        <h1 className="text-3xl font-bold">abd-mfe-shell</h1>
        <p className="mt-2 text-slate-400">
          Standalone remote shell (port 3001). Embedded in host app at /dashboard/micro.
        </p>
      </header>
      <MicroShellApp />
    </main>
  );
}
