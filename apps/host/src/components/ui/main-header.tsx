import Link from "next/link";

export function MainHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/home" className="text-lg font-semibold">
          PulseBoard
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/">Portfolio</Link>
          <Link href="/home">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/internals">Internals</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
