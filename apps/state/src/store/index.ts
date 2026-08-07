import { configureStore } from "@reduxjs/toolkit";
import { demoReducer } from "./demoSlice";

export type RootState = {
  demo: ReturnType<typeof demoReducer>;
};

export type AppStore = ReturnType<typeof configureStore<RootState>>;
export type AppDispatch = AppStore["dispatch"];

const STORE_KEY = "__abd_mfe_shared_store__";

let store: AppStore | undefined;

export function getStore() {
  const globalScope = globalThis as typeof globalThis & {
    [STORE_KEY]?: AppStore;
  };

  if (globalScope[STORE_KEY]) {
    return globalScope[STORE_KEY];
  }

  if (!store) {
    store = configureStore({
      reducer: {
        demo: demoReducer,
      },
    });
    globalScope[STORE_KEY] = store;
  }

  return store;
}

export { demoReducer, increment, decrement, setMessage, resetDemo } from "./demoSlice";
export type { DemoState, DemoUpdater } from "./demoSlice";
