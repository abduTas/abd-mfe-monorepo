"use client";

import { ThemeProvider } from "@abd/design-system";

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider initialTheme="light">{children}</ThemeProvider>;
}
