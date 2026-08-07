import { MicroPageClient } from "@/components/mfe/micro-page-client";

export default function MicroDashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Microfrontend Demo</h1>
        <p className="mt-1 text-sm text-slate-500">
          Host route that composes <code>remoteShell/MicroShellApp</code> and shared Redux state
          from <code>sharedState/store</code>.
        </p>
      </header>
      <MicroPageClient />
    </div>
  );
}
