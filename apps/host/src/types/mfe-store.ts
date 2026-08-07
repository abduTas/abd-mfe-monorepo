export type DemoUpdater = "host" | "remote" | "state-remote";

export type DemoState = {
  count: number;
  message: string;
  lastUpdatedBy: DemoUpdater;
};

export type RootState = {
  demo: DemoState;
};

export type AppDispatch = import("@reduxjs/toolkit").ThunkDispatch<
  RootState,
  unknown,
  import("@reduxjs/toolkit").UnknownAction
>;
