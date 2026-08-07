"use server";

import type { JsonPlaceholderPost } from "@/types/json-placeholder";

const baseUrl =
  process.env.JSONPLACEHOLDER_BASE_URL?.replace(/\/$/, "") ??
  "https://jsonplaceholder.typicode.com";

export async function fetchJsonPlaceholderPost(postId: number) {
  if (!Number.isFinite(postId) || postId < 1) {
    return { ok: false as const, error: "Invalid post id." };
  }

  try {
    const res = await fetch(`${baseUrl}/posts/${postId}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      return {
        ok: false as const,
        error: `Request failed (${res.status} ${res.statusText})`,
      };
    }

    const data = (await res.json()) as JsonPlaceholderPost;
    return { ok: true as const, data };
  } catch {
    return { ok: false as const, error: "Network error while fetching post." };
  }
}
