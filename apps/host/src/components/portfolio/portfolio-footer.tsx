type PortfolioFooterProps = {
  name: string;
};

export function PortfolioFooter({ name }: PortfolioFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>
          © {year} {name}. All rights reserved.
        </p>
        <p className="text-slate-600">Built with Next.js · React · TypeScript · Tailwind CSS</p>
      </div>
    </footer>
  );
}
