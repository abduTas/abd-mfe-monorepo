import Link from "next/link";
import { LogoutButton } from "@/components/ui/logout-button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="card h-fit p-4">
        <p className="mb-3 text-sm font-semibold text-slate-500">Dashboard Nav</p>
        <nav className="space-y-2 text-sm">
          <Link className="block" href="/dashboard">
            Overview
          </Link>
          <Link className="block" href="/dashboard/products">
            Products
          </Link>
          <Link className="block" href="/dashboard/settings">
            Settings
          </Link>
          <Link className="block" href="/dashboard/micro">
            Micro App
          </Link>
        </nav>
        <div className="mt-4">
          <LogoutButton />
        </div>
      </aside>
      <section className="space-y-4">{children}</section>
    </div>
  );
}
