import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  applyCssVariables,
  colors,
  colorPaletteToCssVars,
  getColors,
  setCurrentTheme,
  spacing,
  spacingToCssVars,
  type ThemeAwareColorPalette,
  type Theme,
} from "../../tokens";
import "./theme.css";

export interface ThemeContextValue {
  theme: Theme;
  colors: ThemeAwareColorPalette;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyThemeVariables(theme: Theme) {
  setCurrentTheme(theme);

  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.add("abd-theme");

  applyCssVariables(root, {
    ...spacingToCssVars(spacing),
    ...colorPaletteToCssVars(getColors(theme)),
  });
}

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme?: Theme;
}> = ({ children, initialTheme = "light" }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    applyThemeVariables(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    applyThemeVariables(theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/** Subscribe to theme changes and use `colors.neutral[100]` etc. directly. */
export const useColors = (): ThemeAwareColorPalette => {
  const { colors: themeColors } = useTheme();
  return themeColors;
};
