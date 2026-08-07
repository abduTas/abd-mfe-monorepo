"use client";

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="card space-y-3 p-6">
      <h2 className="text-xl font-semibold">Dashboard failed to render</h2>
      <p className="text-sm text-red-500">{error.message}</p>
      <button onClick={reset} className="rounded bg-slate-900 px-3 py-2 text-white">
        Retry
      </button>
    </div>
  );
}
