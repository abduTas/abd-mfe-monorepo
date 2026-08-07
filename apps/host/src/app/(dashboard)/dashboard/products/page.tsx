import Link from "next/link";
import { ProductsClientManager } from "@/components/dashboard/products-client-manager";
import { listProducts } from "@/lib/mock-db";

export const revalidate = 30;

export default async function ProductsPage() {
  // ISR example: statically rendered but revalidated every 30s.
  const products = listProducts();
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Products (ISR)</h1>
      <div className="grid gap-3">
        {products.map((product) => (
          <article key={product.id} className="card p-4">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-slate-500">
              ${product.price} · Stock {product.inventory} · {product.category}
            </p>
            <Link href={`/dashboard/products/${product.id}`} className="text-sm underline">
              View detail
            </Link>
          </article>
        ))}
      </div>
      <ProductsClientManager />
    </section>
  );
}
