"use client";

import { useEffect, useRef, useState } from "react";

function formatMs(totalMs: number) {
  const ms = Math.floor(totalMs % 1000);
  const totalSec = Math.floor(totalMs / 1000);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600);
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}

export function TimerDemo() {
  const [running, setRunning] = useState(false);
  const [displayMs, setDisplayMs] = useState(0);
  const accumulatedRef = useRef(0);
  const segmentStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const start = segmentStartRef.current;
      const extra = start === null ? 0 : Date.now() - start;
      setDisplayMs(accumulatedRef.current + extra);
    };
    tick();
    const id = window.setInterval(tick, 50);
    return () => window.clearInterval(id);
  }, [running]);

  function start() {
    if (running) return;
    segmentStartRef.current = Date.now();
    setRunning(true);
  }

  function pause() {
    if (!running || segmentStartRef.current === null) return;
    accumulatedRef.current += Date.now() - segmentStartRef.current;
    segmentStartRef.current = null;
    setDisplayMs(accumulatedRef.current);
    setRunning(false);
  }

  function reset() {
    accumulatedRef.current = 0;
    segmentStartRef.current = null;
    setDisplayMs(0);
    setRunning(false);
  }

  return (
    <div className="card space-y-4 p-6">
      <div>
        <h2 className="text-xl font-semibold">React timer (POC)</h2>
        <p className="mt-1 text-sm text-slate-500">
          Start resumes from paused total; pause freezes elapsed time; reset clears everything.
        </p>
      </div>

      <p className="font-mono text-3xl tabular-nums tracking-tight">{formatMs(displayMs)}</p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
          onClick={start}
          disabled={running}
        >
          Start
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium disabled:opacity-40 dark:border-slate-600"
          onClick={pause}
          disabled={!running}
        >
          Pause
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium dark:border-slate-600"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
