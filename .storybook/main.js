import { dirname, join } from "path";

module.exports = {
  stories: ["../__docs__/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-designs"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],
  features: {
    // Enables playback controls
    interactionsDebugger: true
  },
  staticDirs: ["../static"],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {
      fastRefresh: true
    }
  },
  docs: {
    autodocs: true
  }
};
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}