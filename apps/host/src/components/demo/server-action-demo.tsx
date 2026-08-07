"use client";

import { useState, useTransition } from "react";
import { fetchJsonPlaceholderPost } from "@/lib/actions/json-placeholder";
import type { JsonPlaceholderPost } from "@/types/json-placeholder";

export function ServerActionDemo() {
  const [post, setPost] = useState<JsonPlaceholderPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function loadPost(postId: number) {
    startTransition(async () => {
      setError(null);
      const result = await fetchJsonPlaceholderPost(postId);
      if (result.ok) {
        setPost(result.data);
      } else {
        setPost(null);
        setError(result.error);
      }
    });
  }

  return (
    <div className="card space-y-4 p-6">
      <div>
        <h2 className="text-xl font-semibold">Server action + JSONPlaceholder</h2>
        <p className="mt-1 text-sm text-slate-500">
          The fetch runs on the server via{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
            fetchJsonPlaceholderPost
          </code>
          . Base URL comes from{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
            JSONPLACEHOLDER_BASE_URL
          </code>{" "}
          in{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">.env</code>.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
          disabled={isPending}
          onClick={() => loadPost(1)}
        >
          {isPending ? "Loading…" : "Load post #1"}
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium disabled:opacity-60 dark:border-slate-600"
          disabled={isPending}
          onClick={() => loadPost(7)}
        >
          Load post #7
        </button>
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      {post ? (
        <article className="space-y-2 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <p className="text-xs text-slate-500">
            Post #{post.id} · user {post.userId}
          </p>
          <h3 className="text-lg font-semibold capitalize">{post.title}</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{post.body}</p>
        </article>
      ) : !error && !isPending ? (
        <p className="text-sm text-slate-500">Choose a post to load.</p>
      ) : null}
    </div>
  );
}
