import type { Experience } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

type ExperienceSectionProps = {
  experience: Experience[];
};

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Career"
          title="Professional experience"
          description="Nine years of shipping production systems — from startups to enterprise-scale platforms."
        />
        <div className="relative space-y-0">
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent md:block" />
          {experience.map((job, index) => (
            <ExperienceCard key={`${job.company}-${job.period}`} job={job} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ job, isFirst }: { job: Experience; isFirst: boolean }) {
  return (
    <article className="relative pb-12 pl-0 md:pl-10">
      <div
        className={`absolute left-0 top-1.5 hidden h-3.5 w-3.5 rounded-full border-2 md:block ${
          isFirst ? "border-emerald-400 bg-emerald-400" : "border-emerald-500/40 bg-slate-950"
        }`}
      />
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">{job.role}</h3>
            <p className="mt-1 text-emerald-400">{job.company}</p>
          </div>
          <time className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-400">
            {job.period}
          </time>
        </div>
        <ul className="space-y-2.5">
          {job.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-slate-400">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
