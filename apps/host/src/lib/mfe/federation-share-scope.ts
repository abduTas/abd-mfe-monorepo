import React from "react";
import ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import * as ReduxToolkit from "@reduxjs/toolkit";

type SharedModule = {
  get: () => () => unknown;
  loaded: 1;
  from: "host";
};

type ShareScope = Record<string, Record<string, SharedModule>>;

let seeded = false;

function createSharedEntry(module: unknown, version: string): Record<string, SharedModule> {
  return {
    [version]: {
      get: () => () => module,
      loaded: 1,
      from: "host",
    },
  };
}

/**
 * Pre-seed the federation share scope with the host's React/Redux packages so
 * remotes use the same singletons as the Next.js app (avoids invalid hook calls).
 */
export function seedHostShareScope(): void {
  if (seeded || typeof window === "undefined") return;

  const hostScope: ShareScope = {
    react: createSharedEntry(React, "19.0.0"),
    "react-dom": createSharedEntry(ReactDOM, "19.0.0"),
    "react-redux": createSharedEntry(ReactRedux, "9.2.0"),
    "@reduxjs/toolkit": createSharedEntry(ReduxToolkit, "2.6.1"),
  };

  const globalScope = globalThis as typeof globalThis & {
    __federation_shared__?: { default?: ShareScope };
  };

  globalScope.__federation_shared__ = {
    ...globalScope.__federation_shared__,
    default: {
      ...globalScope.__federation_shared__?.default,
      ...hostScope,
    },
  };

  seeded = true;
}
