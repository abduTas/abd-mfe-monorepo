"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { DemoUpdater, RootState } from "@/types/mfe-store";
import { loadViteRemoteExpose } from "@/lib/mfe/vite-remote-loader";
import { MFE_STATE_ENTRY } from "@/lib/mfe/remote-urls";

type SharedStoreActions = {
  increment: (updater: DemoUpdater) => { type: string; payload: DemoUpdater };
  decrement: (updater: DemoUpdater) => { type: string; payload: DemoUpdater };
  setMessage: (payload: { message: string; updatedBy: DemoUpdater }) => {
    type: string;
    payload: { message: string; updatedBy: DemoUpdater };
  };
  resetDemo: () => { type: string };
};

export function SharedStateDemo() {
  const [actions, setActions] = useState<SharedStoreActions | null>(null);
  const dispatch = useDispatch();
  const demo = useSelector((state: RootState) => state.demo);

  useEffect(() => {
    loadViteRemoteExpose<SharedStoreActions>(MFE_STATE_ENTRY, "./store")
      .then(setActions)
      .catch(() => setActions(null));
  }, []);

  if (!actions) {
    return <div className="card animate-pulse p-6 text-sm text-slate-400">Loading host panel…</div>;
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Host shared-state panel</h2>
      <p className="text-sm text-slate-400">
        Updates the federated Redux store from the PulseBoard host app.
      </p>
      <p className="text-2xl font-bold">Count: {demo.count}</p>
      <p className="text-sm text-slate-300">{demo.message}</p>
      <p className="text-xs text-slate-500">Last updated by: {demo.lastUpdatedBy}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
          onClick={() => dispatch(actions.increment("host"))}
        >
          Increment (host)
        </button>
        <button
          type="button"
          className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
          onClick={() => dispatch(actions.decrement("host"))}
        >
          Decrement (host)
        </button>
        <button
          type="button"
          className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
          onClick={() =>
            dispatch(
              actions.setMessage({
                message: "Updated from PulseBoard host",
                updatedBy: "host",
              }),
            )
          }
        >
          Set message (host)
        </button>
        <button
          type="button"
          className="rounded-md bg-rose-800 px-3 py-2 text-sm text-white hover:bg-rose-700"
          onClick={() => dispatch(actions.resetDemo())}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
