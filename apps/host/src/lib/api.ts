import { Product } from "@/types";

export async function getProductsServerCached() {
  // force-cache keeps response in the data cache for build/static requests.
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to load products");
  return (await res.json()) as Product[];
}

export async function getProductsServerDynamic() {
  // no-store disables caching and forces fresh data each request (SSR).
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load products");
  return (await res.json()) as Product[];
}
