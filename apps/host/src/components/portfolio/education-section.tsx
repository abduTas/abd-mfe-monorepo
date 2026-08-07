import { SectionHeading } from "./section-heading";

type EducationSectionProps = {
  degree: string;
  year: string;
};

export function EducationSection({ degree, year }: EducationSectionProps) {
  return (
    <section
      id="education"
      className="scroll-mt-20 border-t border-white/5 bg-white/[0.02] px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Education" title="Academic background" />
        <div className="inline-flex items-center gap-6 rounded-2xl border border-white/5 bg-slate-900/50 px-8 py-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
            🎓
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{degree}</p>
            <p className="text-slate-400">Graduated {year}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
