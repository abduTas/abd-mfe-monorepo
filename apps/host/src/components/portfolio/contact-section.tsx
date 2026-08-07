type ContactSectionProps = {
  email: string;
  phone: string;
  linkedin: string;
};

export function ContactSection({ email, phone, linkedin }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-white/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 p-10 md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Contact
            </p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Let&apos;s build something great together
            </h2>
            <p className="mt-4 max-w-xl text-slate-400">
              Open to tech lead roles, frontend architecture consulting, and leadership
              opportunities on high-impact product teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${email}`}
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Email me
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
              >
                Connect on LinkedIn
              </a>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
