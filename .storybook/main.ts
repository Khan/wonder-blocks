import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import remarkGfm from "remark-gfm";
import type {StorybookConfig} from "@storybook/react-vite";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
    stories: [
        "../__docs__/**/*.@(mdx|stories.@(ts|tsx))",
        "../__docs__/**/*.mdx",
    ],
    addons: [
        getAbsolutePath("@storybook/addon-a11y"),
        getAbsolutePath("storybook-addon-pseudo-states"),
        getAbsolutePath("@storybook/addon-vitest"),
        {
            name: getAbsolutePath("@storybook/addon-docs"),
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            },
        }
    ],
    staticDirs: ["../static"],
    core: {
        builder: getAbsolutePath("@storybook/builder-vite"),
        disableTelemetry: true,
    },
    framework: getAbsolutePath("@storybook/react-vite"),
    async viteFinal(config) {
        // Merge custom configuration into the default config
        const {mergeConfig} = await import("vite");

        return mergeConfig(config, {
            // Prevent Vite from inlining phosphor-icons
            build: {
                assetsInlineLimit: 0,
            },
        });
    },
};

export default config;

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, "package.json")));
}
