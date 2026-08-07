declare module "sharedState/store" {
  import type { Store } from "@reduxjs/toolkit";
  import type { RootState, AppDispatch, DemoUpdater } from "./store-types";

  export function getStore(): Store<RootState>;
  export const increment: (updater: DemoUpdater) => { type: string; payload: DemoUpdater };
  export const decrement: (updater: DemoUpdater) => { type: string; payload: DemoUpdater };
  export const setMessage: (payload: {
    message: string;
    updatedBy: DemoUpdater;
  }) => { type: string; payload: { message: string; updatedBy: DemoUpdater } };
  export const resetDemo: () => { type: string };
  export type { RootState, AppDispatch, DemoUpdater };
}

declare module "sharedState/hooks" {
  import type { TypedUseSelectorHook } from "react-redux";
  import type { RootState, AppDispatch } from "./store-types";

  export function useAppDispatch(): AppDispatch;
  export const useAppSelector: TypedUseSelectorHook<RootState>;
}
