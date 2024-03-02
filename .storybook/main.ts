import path from "path";
import { mergeConfig } from "vite";
import sassDts from "vite-plugin-sass-dts";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      cacheDir: path.join(__dirname, "../node_modules/.vite-unique-name"),
      plugins: [sassDts()],
      css: {
        module: true,
      },
    });
  },
};
export default config;
