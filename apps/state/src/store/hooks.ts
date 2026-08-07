import { useRef, useSyncExternalStore } from "react";
import { getStore, type AppDispatch, type RootState } from "./index";

export function useAppDispatch(): AppDispatch {
  return getStore().dispatch;
}

export function useAppSelector<T>(selector: (state: RootState) => T): T {
  const store = getStore();
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  return useSyncExternalStore(
    store.subscribe,
    () => selectorRef.current(store.getState()),
    () => selectorRef.current(store.getState()),
  );
}
