import Link from "next/link";
import type { portfolio } from "@/data/portfolio";

type PortfolioNavProps = {
  name: typeof portfolio.name;
  navLinks: typeof portfolio.navLinks;
};

export function PortfolioNav({ name, navLinks }: PortfolioNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-lg font-bold text-transparent"
        >
          {name.split(" ")[0]}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
