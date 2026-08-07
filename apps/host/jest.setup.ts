import "@testing-library/jest-dom";

if (!global.crypto?.randomUUID) {
  Object.defineProperty(global, "crypto", {
    value: {
      randomUUID: () => "00000000-0000-4000-8000-000000000000",
    },
  });
}
