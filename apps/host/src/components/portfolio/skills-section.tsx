import type { SkillCategory } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

type SkillsSectionProps = {
  skillCategories: SkillCategory[];
};

export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-white/5 bg-white/[0.02] px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Expertise"
          title="Core skills & technical stack"
          description="From component libraries to CI/CD — full-stack frontend leadership across the modern web."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="group rounded-2xl border border-white/5 bg-slate-900/50 p-6 transition hover:border-emerald-500/20 hover:bg-slate-900/80">
      <h3 className="mb-4 font-semibold text-white">{category.title}</h3>
      <ul className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-white/5 bg-white/[0.04] px-3 py-1 text-xs text-slate-300 transition group-hover:border-emerald-500/10 group-hover:text-slate-200"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
