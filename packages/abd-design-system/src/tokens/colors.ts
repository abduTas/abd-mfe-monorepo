import type { Theme } from "./theme";

export const colorTokens = {
  light: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
    neutral: {
      0: "#ffffff",
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      500: "#6b7280",
      700: "#374151",
      900: "#111827",
    },
    semantic: {
      success: "#16a34a",
      warning: "#ca8a04",
      error: "#dc2626",
    },
  },
  dark: {
    primary: {
      50: "#172554",
      100: "#1e3a8a",
      500: "#60a5fa",
      600: "#3b82f6",
      700: "#2563eb",
    },
    neutral: {
      0: "#111827",
      50: "#1f2937",
      100: "#374151",
      200: "#4b5563",
      500: "#9ca3af",
      700: "#d1d5db",
      900: "#f9fafb",
    },
    semantic: {
      success: "#22c55e",
      warning: "#eab308",
      error: "#ef4444",
    },
  },
} as const;

export type ColorTokens = typeof colorTokens;
export type ColorPalette = ColorTokens[Theme];

export function getColors(theme: Theme): ColorPalette {
  return colorTokens[theme];
}
