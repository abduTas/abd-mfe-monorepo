import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DemoUpdater = "host" | "remote" | "state-remote";

export type DemoState = {
  count: number;
  message: string;
  lastUpdatedBy: DemoUpdater;
};

const initialState: DemoState = {
  count: 0,
  message: "Shared Redux state is ready.",
  lastUpdatedBy: "state-remote",
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<DemoUpdater>) {
      state.count += 1;
      state.lastUpdatedBy = action.payload;
    },
    decrement(state, action: PayloadAction<DemoUpdater>) {
      state.count -= 1;
      state.lastUpdatedBy = action.payload;
    },
    setMessage(state, action: PayloadAction<{ message: string; updatedBy: DemoUpdater }>) {
      state.message = action.payload.message;
      state.lastUpdatedBy = action.payload.updatedBy;
    },
    resetDemo(state) {
      state.count = 0;
      state.message = initialState.message;
      state.lastUpdatedBy = "state-remote";
    },
  },
});

export const { increment, decrement, setMessage, resetDemo } = demoSlice.actions;
export const demoReducer = demoSlice.reducer;
