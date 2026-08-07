"use client";

import { useStatsQuery } from "@/hooks/use-stats-query";

export function StatsLive() {
  // WHY React Query here:
  // - handles loading/error/caching/retries declaratively
  // - removes manual useEffect + useState boilerplate
  // - shares cache across components using same queryKey
  const { data: stats, isLoading } = useStatsQuery();

  if (isLoading) return <p className="text-sm text-slate-500">Loading live stats...</p>;
  if (!stats) return <p className="text-sm text-red-500">Stats unavailable.</p>;

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <article className="card p-4">
        <p className="text-sm text-slate-500">Live Revenue</p>
        <p className="text-2xl font-semibold">${stats.revenue.toLocaleString()}</p>
      </article>
      <article className="card p-4">
        <p className="text-sm text-slate-500">Active Users</p>
        <p className="text-2xl font-semibold">{stats.activeUsers.toLocaleString()}</p>
      </article>
      <article className="card p-4">
        <p className="text-sm text-slate-500">Churn Rate</p>
        <p className="text-2xl font-semibold">{stats.churnRate}%</p>
      </article>
    </div>
  );
}
