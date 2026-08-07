"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

type RestCountryMatch = {
  name: { common: string };
  capital?: string[];
  region: string;
  population: number;
};

const DEBOUNCE_MS = 450;
const MIN_CHARS = 2;

export function DebouncedSearchDemo() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_MS);
  const [results, setResults] = useState<RestCountryMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (debouncedQuery.length < MIN_CHARS) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const path = `https://restcountries.com/v3.1/name/${encodeURIComponent(debouncedQuery)}`;

    void (async () => {
      try {
        const { data } = await axios.get<RestCountryMatch[]>(path, {
          signal: controller.signal,
          params: { fields: "name,capital,region,population" },
        });
        setResults(Array.isArray(data) ? data.slice(0, 12) : []);
      } catch (err: unknown) {
        if (axios.isCancel(err)) return;
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setResults([]);
          return;
        }
        setResults([]);
        setError(axios.isAxiosError(err) ? err.message : "Request failed");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div className="card space-y-4 p-6">
      <div>
        <h2 className="text-xl font-semibold">useDebounce + Axios + REST Countries</h2>
        <p className="mt-1 text-sm text-slate-500">
          Typing updates immediately;{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
            axios.get
          </code>{" "}
          runs after{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
            {DEBOUNCE_MS}ms
          </code>{" "}
          of quiet input ({MIN_CHARS}+ chars). Each run passes{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
            signal: abortController.signal
          </code>
          ; cleanup calls{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
            abort()
          </code>{" "}
          so stale requests cancel (
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
            axios.isCancel
          </code>
          ).
        </p>
      </div>

      <div className="space-y-1">
        <label htmlFor="country-search" className="text-sm font-medium">
          Search countries
        </label>
        <input
          id="country-search"
          type="search"
          autoComplete="off"
          placeholder="e.g. canada, japan, france"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none ring-slate-400 focus:ring-2 dark:border-slate-600"
        />
        <p className="text-xs text-slate-500">
          Debounced value:{" "}
          <span className="font-mono text-slate-700 dark:text-slate-300">
            {debouncedQuery || "(empty)"}
          </span>
        </p>
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading…</p> : null}
      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      {!loading && debouncedQuery.length >= MIN_CHARS && results.length === 0 && !error ? (
        <p className="text-sm text-slate-500">No matches.</p>
      ) : null}

      {results.length > 0 ? (
        <ul className="max-h-72 space-y-2 overflow-y-auto text-sm">
          {results.map((c) => (
            <li
              key={c.name.common}
              className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700"
            >
              <span className="font-semibold">{c.name.common}</span>
              <span className="text-slate-500">
                {" "}
                · {c.region}
                {c.capital?.length ? ` · ${c.capital.join(", ")}` : ""} ·{" "}
                {c.population.toLocaleString()} people
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
