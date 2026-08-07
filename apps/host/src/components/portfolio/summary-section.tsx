import { SectionHeading } from "./section-heading";

type SummarySectionProps = {
  summary: string;
};

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <section id="about" className="scroll-mt-20 border-t border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Building scalable frontends that teams love to ship"
          description="Translating business requirements into high-performance, maintainable systems."
        />
        <div className="grid gap-8 md:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <p className="text-xl font-medium leading-relaxed text-white md:text-2xl">
              {summary.split(". ")[0]}.
            </p>
            <p className="text-lg leading-relaxed text-slate-400">
              {summary.split(". ").slice(1).join(". ")}
            </p>
          </div>

          <aside className="space-y-4">
            <HighlightCard
              title="Leadership"
              description="Led teams of 7+ engineers with end-to-end ownership of architecture and delivery."
            />
            <HighlightCard
              title="Performance"
              description="Lighthouse 65→90+, ~35% CWV gains, ~30% faster load times through systematic optimization."
            />
            <HighlightCard
              title="AI Workflows"
              description="Pioneered Cursor, Claude & MCP adoption — accelerating team delivery by 20–30%."
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

function HighlightCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <h3 className="font-semibold text-emerald-400">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
