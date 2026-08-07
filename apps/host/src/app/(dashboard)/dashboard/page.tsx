import loadable from "next/dynamic";
import { StatsLive } from "@/components/dashboard/stats-live";
import { listProducts } from "@/lib/mock-db";

const HeavyChart = loadable(() => import("@/components/dashboard/heavy-chart"), {
  loading: () => <p className="text-sm text-slate-500">Loading chart bundle...</p>,
});

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // SSR example: force-dynamic means render on every request.
  const products = listProducts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard (SSR + CSR)</h1>
      <p className="text-sm text-slate-500">
        This route is dynamically rendered server-side and includes a client-side live stats widget.
      </p>
      <StatsLive />
      <HeavyChart />
      <section className="card p-4">
        <h2 className="mb-2 text-xl font-semibold">Recent Products</h2>
        <ul className="space-y-1 text-sm">
          {products.slice(0, 3).map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
