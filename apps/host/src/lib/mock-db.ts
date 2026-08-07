import { Product } from "@/types";

// In-memory mock DB for learning. Replace this with a real database in production.
let products: Product[] = [
  {
    id: "p_1",
    name: "Analytics Pro",
    price: 79,
    inventory: 220,
    category: "Software",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p_2",
    name: "Team Workspace",
    price: 49,
    inventory: 120,
    category: "SaaS",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p_3",
    name: "Growth Insights",
    price: 99,
    inventory: 80,
    category: "Data",
    updatedAt: new Date().toISOString(),
  },
];

export function listProducts() {
  return products;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id) ?? null;
}

export function createProduct(payload: Omit<Product, "id" | "updatedAt">) {
  const next: Product = {
    id: `p_${crypto.randomUUID().slice(0, 8)}`,
    updatedAt: new Date().toISOString(),
    ...payload,
  };
  products = [next, ...products];
  return next;
}

export function updateProduct(id: string, payload: Partial<Omit<Product, "id">>) {
  let updated: Product | null = null;
  products = products.map((product) => {
    if (product.id !== id) return product;
    updated = { ...product, ...payload, updatedAt: new Date().toISOString() };
    return updated;
  });
  return updated;
}

export function deleteProduct(id: string) {
  const before = products.length;
  products = products.filter((product) => product.id !== id);
  return before !== products.length;
}
