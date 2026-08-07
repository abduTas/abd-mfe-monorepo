import { seedHostShareScope } from "@/lib/mfe/federation-share-scope";

type ViteFederationContainer = {
  init: (shareScope: Record<string, unknown>) => void | Promise<void>;
  get: (module: string) => Promise<unknown>;
};

const containerCache = new Map<string, Promise<ViteFederationContainer>>();
const initializedEntries = new Set<string>();

function getShareScope(): Record<string, unknown> {
  const globalScope = globalThis as typeof globalThis & {
    __federation_shared__?: { default?: Record<string, unknown> };
  };

  return globalScope.__federation_shared__?.default ?? {};
}

/**
 * Load an ESM URL with the browser's native module loader.
 * Next.js/webpack can swallow dynamic import() for external URLs, so we inject
 * a type="module" script instead.
 */
function importEsmModule<T extends Record<string, unknown>>(url: string): Promise<T> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Vite remotes can only be loaded in the browser."));
  }

  return new Promise((resolve, reject) => {
    const callbackId = `__vite_remote_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    const script = document.createElement("script");
    script.type = "module";

    (globalThis as Record<string, unknown>)[callbackId] = (remoteModule: T) => {
      delete (globalThis as Record<string, unknown>)[callbackId];
      script.remove();
      resolve(remoteModule);
    };

    script.textContent = `
      import * as remote from ${JSON.stringify(url)};
      globalThis[${JSON.stringify(callbackId)}](remote);
    `;
    script.onerror = () => {
      delete (globalThis as Record<string, unknown>)[callbackId];
      script.remove();
      reject(new Error(`Failed to load remote entry: ${url}`));
    };

    document.head.appendChild(script);
  });
}

async function loadContainer(entryUrl: string): Promise<ViteFederationContainer> {
  seedHostShareScope();

  let containerPromise = containerCache.get(entryUrl);

  if (!containerPromise) {
    containerPromise = importEsmModule<ViteFederationContainer>(entryUrl);
    containerCache.set(entryUrl, containerPromise);
  }

  const container = await containerPromise;

  if (!initializedEntries.has(entryUrl)) {
    await container.init(getShareScope());
    initializedEntries.add(entryUrl);
  }

  return container;
}

function normalizeExposePath(expose: string): string {
  return expose.startsWith("./") ? expose : `./${expose}`;
}

function isRenderableExport(value: unknown): boolean {
  return (
    typeof value === "function" ||
    (typeof value === "object" && value !== null && "$$typeof" in value)
  );
}

function unwrapModule<T>(exposed: unknown): T {
  if (!exposed || typeof exposed !== "object") {
    return exposed as T;
  }

  const record = exposed as Record<string, unknown>;

  // Vite federation exposes often return `{ default: Component, _: helper }`.
  if ("default" in record && isRenderableExport(record.default)) {
    return record.default as T;
  }

  if ("default" in record) {
    const keys = Object.keys(record);
    const hasOnlyDefaultExport =
      keys.length === 1 || (keys.length === 2 && keys.includes("__esModule"));

    if (hasOnlyDefaultExport) {
      return record.default as T;
    }
  }

  return exposed as T;
}

async function resolveExposeModule(factoryOrModule: unknown): Promise<unknown> {
  if (typeof factoryOrModule === "function") {
    return Promise.resolve((factoryOrModule as () => unknown)());
  }

  return factoryOrModule;
}

export async function loadViteRemoteExpose<T>(entryUrl: string, expose: string): Promise<T> {
  const container = await loadContainer(entryUrl);
  const factoryOrModule = await container.get(normalizeExposePath(expose));
  const exposed = await resolveExposeModule(factoryOrModule);
  return unwrapModule<T>(exposed);
}
