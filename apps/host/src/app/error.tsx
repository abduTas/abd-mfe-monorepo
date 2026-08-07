"use client";

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="card mx-auto max-w-xl space-y-3 p-6">
      <h2 className="text-2xl font-semibold">Application error</h2>
      <p className="text-sm text-red-500">{error.message}</p>
      <button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={reset}>
        Retry render
      </button>
    </div>
  );
}
