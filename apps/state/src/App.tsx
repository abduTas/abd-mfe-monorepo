import { decrement, increment, resetDemo, setMessage } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function App() {
  const dispatch = useAppDispatch();
  const demo = useAppSelector((state) => state.demo);

  return (
    <main className="mx-auto min-h-screen max-w-2xl p-8">
      <h1 className="mb-2 text-3xl font-bold">abd-mfe-state</h1>
      <p className="mb-6 text-slate-400">Redux shared-state microfrontend (port 3002)</p>
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold">Shared State Remote (standalone)</h2>
        <p className="text-sm text-slate-400">
          Exposes <code className="text-emerald-400">sharedState/store</code> via Module Federation.
        </p>
        <p className="text-2xl font-bold">Count: {demo.count}</p>
        <p className="text-sm text-slate-300">{demo.message}</p>
        <p className="text-xs text-slate-500">Last updated by: {demo.lastUpdatedBy}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white"
            onClick={() => dispatch(increment("state-remote"))}
          >
            Increment
          </button>
          <button
            type="button"
            className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white"
            onClick={() => dispatch(decrement("state-remote"))}
          >
            Decrement
          </button>
          <button
            type="button"
            className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white"
            onClick={() =>
              dispatch(
                setMessage({
                  message: "Updated from state-remote standalone app",
                  updatedBy: "state-remote",
                }),
              )
            }
          >
            Set message
          </button>
          <button
            type="button"
            className="rounded-md bg-rose-700 px-3 py-2 text-sm text-white"
            onClick={() => dispatch(resetDemo())}
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
