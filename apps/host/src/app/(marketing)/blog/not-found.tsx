import Link from "next/link";

export default function BlogNotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Blog post not found</h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
        The article you are looking for does not exist, may have been moved, or is no longer
        available.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/blog"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Back to blog
        </Link>
        <Link
          href="/"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
