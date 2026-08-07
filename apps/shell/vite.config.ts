import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const stateUrl = env.NEXT_PUBLIC_MFE_STATE_URL || "http://localhost:3002";

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      react({ jsxRuntime: "classic" }),
      federation({
        name: "remoteShell",
        filename: "remoteEntry.js",
        remotes: {
          sharedState: `${stateUrl}/assets/remoteEntry.js`,
        },
        exposes: {
          "./MicroShellApp": "./src/components/MicroShellApp.tsx",
        },
        shared: {
          react: { singleton: true, requiredVersion: "^19.0.0" },
          "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
          "react-redux": { singleton: true, requiredVersion: "^9.2.0" },
          "@reduxjs/toolkit": { singleton: true, requiredVersion: "^2.6.1" },
        },
      }),
    ],
    preview: {
      port: 3001,
      strictPort: true,
      cors: true,
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});
