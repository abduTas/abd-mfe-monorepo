"use client";

import { Button, useTheme } from "@abd/design-system";

export function DesignSystemShowcase() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Design system</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Shared components from <code className="text-xs">@abd/design-system</code>
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={toggleTheme}>
          Theme: {theme}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  );
}
