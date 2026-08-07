import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, listProducts } from "@/lib/mock-db";

export async function generateStaticParams() {
  // Pre-generate a few product pages at build time.
  return listProducts()
    .slice(0, 2)
    .map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} details`,
    description: `Inventory ${product.inventory} in ${product.category}`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <article className="card space-y-3 p-6">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p className="text-sm text-slate-500">ID: {product.id}</p>
      <p>Price: ${product.price}</p>
      <p>Inventory: {product.inventory}</p>
      <p>Category: {product.category}</p>
    </article>
  );
}
