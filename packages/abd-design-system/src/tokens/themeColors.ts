import { getColors, type ColorPalette } from "./colors";
import type { Theme } from "./theme";

let currentTheme: Theme = "light";

export function setCurrentTheme(theme: Theme) {
  currentTheme = theme;
}

export function getCurrentTheme(): Theme {
  return currentTheme;
}

export type ThemeAwareColorPalette = {
  [G in keyof ColorPalette]: {
    [K in keyof ColorPalette[G]]: string;
  };
};

function themeAwareColorGroup<G extends keyof ColorPalette>(
  group: G,
): ThemeAwareColorPalette[G] {
  return new Proxy({} as ThemeAwareColorPalette[G], {
    get(_, key: string) {
      const palette = getColors(currentTheme)[group];
      return (palette as Record<string, string>)[key];
    },
  });
}

/**
 * Theme-aware color palette. Reads from the active theme set by ThemeProvider.
 * Use with `useColors()` in React so components re-render on theme change.
 */
export const colors: ThemeAwareColorPalette = {
  primary: themeAwareColorGroup("primary"),
  neutral: themeAwareColorGroup("neutral"),
  semantic: themeAwareColorGroup("semantic"),
};
