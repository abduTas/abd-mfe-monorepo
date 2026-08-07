import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export default function MarketingHomePage() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Ship full-stack apps with confidence.</h1>
        <p className="text-slate-600 dark:text-slate-300">
          PulseBoard is a teaching-first SaaS starter that demonstrates App Router patterns.
        </p>
        <div className="flex gap-3">
          <Link href="/dashboard" className="rounded-md bg-slate-900 px-4 py-2 text-white">
            Open Dashboard
          </Link>
          <Link href="/blog" className="rounded-md border px-4 py-2">
            Read Blog
          </Link>
        </div>
      </section>
      <Image
        src="/next.svg"
        alt="Optimized image with next/image"
        width={520}
        height={280}
        priority
        className="mx-auto"
      />
    </div>
  );
}
