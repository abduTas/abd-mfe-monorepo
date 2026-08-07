import { describe, expect, it } from "vitest";
import { decrement, demoReducer, increment, resetDemo, setMessage } from "../demoSlice";

describe("demoSlice", () => {
  const initial = demoReducer(undefined, { type: "@@INIT" });

  it("increments count and tracks updater", () => {
    const next = demoReducer(initial, increment("host"));
    expect(next.count).toBe(1);
    expect(next.lastUpdatedBy).toBe("host");
  });

  it("decrements count", () => {
    const seeded = demoReducer(initial, increment("remote"));
    const next = demoReducer(seeded, decrement("host"));
    expect(next.count).toBe(0);
    expect(next.lastUpdatedBy).toBe("host");
  });

  it("updates message", () => {
    const next = demoReducer(
      initial,
      setMessage({ message: "Hello from test", updatedBy: "remote" }),
    );
    expect(next.message).toBe("Hello from test");
    expect(next.lastUpdatedBy).toBe("remote");
  });

  it("resets to initial state", () => {
    const seeded = demoReducer(initial, increment("host"));
    const next = demoReducer(seeded, resetDemo());
    expect(next.count).toBe(0);
    expect(next.lastUpdatedBy).toBe("state-remote");
  });
});
