"use client";

export default function HeavyChart() {
  // Pretend this is a heavyweight chart package: dynamic import keeps initial JS smaller.
  return (
    <div className="card p-4">
      <p className="text-sm text-slate-500">Lazy-loaded chart module</p>
      <div className="mt-2 h-28 rounded bg-gradient-to-r from-cyan-500 to-blue-600" />
    </div>
  );
}
