import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="card mx-auto max-w-lg space-y-3 p-6 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-sm text-slate-500">
        The route may be invalid or the resource does not exist.
      </p>
      <Link href="/home" className="underline">
        Return home
      </Link>
    </div>
  );
}
