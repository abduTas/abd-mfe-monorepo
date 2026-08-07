import { Metadata } from "next";
import { notFound } from "next/navigation";

const postMap: Record<string, { title: string; content: string }> = {
  "ssr-vs-ssg": {
    title: "SSR vs SSG in Real Products",
    content: "SSR is great for user-specific pages; SSG is ideal for public content.",
  },
  "isr-at-scale": {
    title: "Using ISR at Scale",
    content: "ISR lets static pages refresh incrementally without full rebuilds.",
  },
};

export const revalidate = 12;

export async function generateStaticParams() {
  return Object.keys(postMap).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postMap[slug];
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.content };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postMap[slug];
  if (!post) notFound();

  return (
    <article className="space-y-3">
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p className="text-slate-600 dark:text-slate-300">{post.content}</p>
      <p className="text-sm text-slate-500">
        ISR in action: this page is statically generated, then revalidated in background every 12s.
      </p>
    </article>
  );
}
