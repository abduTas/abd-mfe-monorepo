import Link from "next/link";

const posts = [
  { slug: "ssr-vs-ssg", title: "SSR vs SSG in Real Products" },
  { slug: "isr-at-scale", title: "Using ISR at Scale" },
];

export const dynamic = "force-static";

export default function BlogIndexPage() {
  // SSG example: built ahead of time because data is static.
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Engineering Blog (SSG)</h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug} className="card p-4">
            <Link href={`/blog/${post.slug}`} className="font-medium underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
