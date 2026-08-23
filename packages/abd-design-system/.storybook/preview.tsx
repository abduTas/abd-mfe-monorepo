import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/components/ThemeProvider';
import '../src/components/ThemeProvider/theme.css';
import React from 'react';
type Theme = 'light' | 'dark';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Design system color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, { globals }) => {
      const theme = globals.theme as Theme;

      return (
        <ThemeProvider key={theme} initialTheme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
};

export default preview;
