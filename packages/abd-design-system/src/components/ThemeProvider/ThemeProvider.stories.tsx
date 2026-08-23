import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { ThemeProvider, useTheme } from "./ThemeProvider";

function ThemeToggleDemo() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
      <Button onClick={toggleTheme}>
        Toggle theme (current: {theme})
      </Button>
      <Checkbox label="Sample checkbox" defaultChecked />
    </div>
  );
}

const meta: Meta<typeof ThemeProvider> = {
  title: "Foundation/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const WithToggle: Story = {
  render: () => <ThemeToggleDemo />,
};
