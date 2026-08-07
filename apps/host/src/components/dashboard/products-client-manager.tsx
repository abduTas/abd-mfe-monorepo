"use client";

import { FormEvent, useState } from "react";
import { useCreateProductMutation, useProductsQuery } from "@/hooks/use-products-query";

export function ProductsClientManager() {
  const { data: products, isLoading, isError } = useProductsQuery();
  const createMutation = useCreateProductMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(49);
  const [inventory, setInventory] = useState(50);
  const [category] = useState("SaaS");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createMutation.mutate({ name, price, inventory, category });
    setName("");
  }

  return (
    <section className="card space-y-4 p-4">
      <h2 className="text-xl font-semibold">Client Data Layer (React Query + Axios)</h2>
      <p className="text-sm text-slate-500">
        This component demonstrates browser-side fetching + mutation with cache invalidation.
      </p>

      <form onSubmit={onSubmit} className="grid gap-2 md:grid-cols-4">
        <input
          className="rounded border p-2"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="rounded border p-2"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={1}
        />
        <input
          className="rounded border p-2"
          type="number"
          value={inventory}
          onChange={(e) => setInventory(Number(e.target.value))}
          min={0}
        />
        <button
          className="rounded bg-slate-900 px-3 py-2 text-white disabled:opacity-60"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>

      <div className="text-sm">
        {isLoading ? <p>Loading products...</p> : null}
        {isError ? <p className="text-red-500">Failed to load products.</p> : null}
        <ul className="space-y-1">
          {(products ?? []).slice(0, 5).map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price} ({product.category})
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
