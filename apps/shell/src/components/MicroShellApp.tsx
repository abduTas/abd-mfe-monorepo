"use client";

import React from "react";
import { Button } from "@abd/design-system";
import { decrement, increment, resetDemo, setMessage } from "sharedState/store";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "sharedState/store";

export default function MicroShellApp() {
  const dispatch = useDispatch();
  const demo = useSelector((state: RootState) => state.demo);

  return (
    <div className="card space-y-4 border-emerald-900/50 bg-emerald-950/20">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-emerald-300">Remote Shell Microfrontend</h2>
        <span className="rounded-full bg-emerald-900/60 px-2 py-1 text-xs text-emerald-200">
          remoteShell/MicroShellApp
        </span>
      </div>
      <p className="text-sm text-slate-300">
        This component is federated from <strong>abd-mfe-shell</strong> and reads/writes the shared
        Redux store from <strong>abd-mfe-state</strong>.
      </p>
      <p className="text-3xl font-bold text-white">Count: {demo.count}</p>
      <p className="text-sm text-slate-300">{demo.message}</p>
      <p className="text-xs text-slate-500">Last updated by: {demo.lastUpdatedBy}</p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => dispatch(increment("remote"))}>
          Increment (remote)
        </Button>
        <button
          type="button"
          className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
          onClick={() => dispatch(decrement("remote"))}
        >
          Decrement (remote)
        </button>
        <button
          type="button"
          className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
          onClick={() =>
            dispatch(
              setMessage({
                message: "Updated from remote shell microfrontend",
                updatedBy: "remote",
              }),
            )
          }
        >
          Set message (remote)
        </button>
        <button
          type="button"
          className="rounded-md bg-rose-800 px-3 py-2 text-sm text-white hover:bg-rose-700"
          onClick={() => dispatch(resetDemo())}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
