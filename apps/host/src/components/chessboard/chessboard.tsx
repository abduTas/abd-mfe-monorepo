"use client";

import { useMemo, useState } from "react";

const MIN_N = 2;
const MAX_N = 16;
const DEFAULT_N = 8;

export function Chessboard() {
  const [n, setN] = useState(DEFAULT_N);

  const cells = useMemo(() => {
    const size = n * n;
    return Array.from({ length: size }, (_, index) => {
      const row = Math.floor(index / n);
      const col = index % n;
      const isLight = (row + col) % 2 === 0;
      return { key: `${row}-${col}`, isLight, row, col };
    });
  }, [n]);

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          N×N chessboard
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Resize the board ({MIN_N}–{MAX_N}). Squares alternate like a standard chess pattern.
        </p>
      </div>

      <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 sm:flex-row sm:items-center sm:gap-3">
          <span className="whitespace-nowrap">Board size (N)</span>
          <input
            id="chessboard-n"
            type="range"
            min={MIN_N}
            max={MAX_N}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full min-w-[12rem] accent-slate-900 dark:accent-slate-100"
            aria-valuemin={MIN_N}
            aria-valuemax={MAX_N}
            aria-valuenow={n}
          />
        </label>
        <output
          className="rounded-md bg-slate-100 px-3 py-1.5 text-center font-mono text-sm font-semibold tabular-nums text-slate-900 dark:bg-slate-800 dark:text-slate-100"
          htmlFor="chessboard-n"
        >
          {n} × {n}
        </output>
      </div>

      <div className="flex justify-center">
        <div
          className="grid w-full max-w-md overflow-hidden rounded-lg border-2 border-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:border-slate-600 dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)]"
          style={{
            gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
            aspectRatio: "1 / 1",
          }}
          role="grid"
          aria-label={`Chessboard, ${n} by ${n}`}
        >
          {cells.map(({ key, isLight, row, col }) => (
            <div
              key={key}
              role="gridcell"
              aria-label={`Square row ${row + 1}, column ${col + 1}`}
              className={
                isLight
                  ? "min-h-0 min-w-0 bg-amber-100 dark:bg-amber-200/90"
                  : "min-h-0 min-w-0 bg-amber-800 dark:bg-amber-950"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
