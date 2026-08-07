import { DebouncedSearchDemo } from "@/components/demo/debounced-search-demo";
import { ServerActionDemo } from "@/components/demo/server-action-demo";
import { TimerDemo } from "@/components/demo/timer-demo";

export default function InternalsPage() {
  return (
    <section className="space-y-6">
      <TimerDemo />
      <DebouncedSearchDemo />
      <ServerActionDemo />
      <section className="card space-y-3 p-6">
        <h1 className="text-2xl font-semibold">Build Internals Notes</h1>
        <p>
          `next build` compiles your app into optimized server and client outputs. Server components
          stay on the server bundle, while client components are split into browser bundles.
        </p>
        <p>
          The `.next` folder contains build artifacts: route manifests, prerendered HTML/RSC
          payloads, client chunks, and server output needed by `next start`.
        </p>
        <p>
          Tree shaking removes unused exports from production bundles. Route-based code splitting
          means only JS needed for the current route is loaded.
        </p>
      </section>
    </section>
  );
}
