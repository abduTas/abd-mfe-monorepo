export default function SettingsPage() {
  return (
    <section className="card space-y-3 p-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        This area is protected by middleware and can be expanded with feature flags, billing, and
        team settings.
      </p>
    </section>
  );
}
