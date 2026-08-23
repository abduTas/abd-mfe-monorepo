import type { ColorPalette } from "./colors";
import type { Spacing } from "./spacing";

export function colorPaletteToCssVars(palette: ColorPalette): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [group, value] of Object.entries(palette) as [
    keyof ColorPalette,
    ColorPalette[keyof ColorPalette],
  ][]) {
    if (group === "semantic") {
      for (const [name, color] of Object.entries(value)) {
        vars[`--color-${name}`] = color;
      }
    } else {
      for (const [shade, color] of Object.entries(value)) {
        vars[`--color-${group}-${shade}`] = color;
      }
    }
  }

  return vars;
}

export function spacingToCssVars(spacing: Spacing): Record<string, string> {
  return Object.fromEntries(
    Object.entries(spacing).map(([key, value]) => [`--spacing-${key}`, value]),
  );
}

export function applyCssVariables(element: HTMLElement, variables: Record<string, string>): void {
  for (const [property, value] of Object.entries(variables)) {
    element.style.setProperty(property, value);
  }
}
