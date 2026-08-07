"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/http-client";
import { Product } from "@/types";

type ProductInput = Omit<Product, "id" | "updatedAt">;

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await http.get<Product[]>("/api/products");
      return data;
    },
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ProductInput) => {
      const { data } = await http.post<Product>("/api/products", payload);
      return data;
    },
    onMutate: (payload) => {
      queryClient.setQueryData(["products"], (old: Product[]) => [...old, payload]);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onSuccess: () => {
      // HOW React Query keeps UI fresh:
      // invalidation marks cache stale, then refetch updates all subscribers.
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
