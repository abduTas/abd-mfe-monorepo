import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { dependencies } from "./package.json";

const sharedDeps = {
  react: {
    singleton: true,
    requiredVersion: dependencies.react,
  },
  "react-dom": {
    singleton: true,
    requiredVersion: dependencies["react-dom"],
  },
  "@reduxjs/toolkit": {
    singleton: true,
    requiredVersion: dependencies["@reduxjs/toolkit"],
  },
  "react-redux": {
    singleton: true,
    requiredVersion: dependencies["react-redux"],
  },
};

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    federation({
      name: "sharedState",
      filename: "remoteEntry.js",
      exposes: {
        "./store": "./src/store/index.ts",
        "./hooks": "./src/store/hooks.ts",
      },
      shared: sharedDeps,
    }),
  ],
  server: {
    port: 3002,
    cors: true,
  },
  preview: {
    port: 3002,
    strictPort: true,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
