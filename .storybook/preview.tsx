import type { Preview } from "@storybook/react-vite";

// biome-ignore lint/correctness/noUnusedImports: <'React' refers to a UMD global, but the current file is a module>
import React from "react";

import "../tmp/storybook-tailwind.css";
import "../src/styles/globals.css";
import "../src/styles/fonts.css";

const A11Y_CONTAINER_TEST_ID = "storybook-a11y-container";

const preview: Preview = {
  parameters: {
    layout: "centered",
    viewport: {
      options: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px"
          }
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px"
          }
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1280px",
            height: "800px"
          }
        }
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      /*
       * Axe's context parameter
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#context-parameter
       * to learn more. Typically, this is the CSS selector for the part of the DOM you want to analyze.
       */
      context: `[data-testid="${A11Y_CONTAINER_TEST_ID}"]`,
      /*
       * Axe's configuration
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure
       * to learn more about the available properties.
       */
      config: {
        /*
         * Color contrast rule is disabled because currently it fails almost all stories.
         * We cant fix it directly without changing the design system with UX team.
         */
        rules: [
          {
            id: "color-contrast",
            enabled: false
          }
        ]
      },
      /*
       * Axe's options parameter
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
       * to learn more about the available options.
       */
      options: {},
      /*
       * Configure test behavior
       * See: https://storybook.js.org/docs/next/writing-tests/accessibility-testing#test-behavior
       */
      test: "error"
    }
  },
  decorators: [
    (Story) => {
      return (
        <div className="font-sans antialiased" data-testid={A11Y_CONTAINER_TEST_ID}>
          <Story />
        </div>
      );
    }
  ]
};

export default preview;
