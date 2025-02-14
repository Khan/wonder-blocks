import remarkGfm from "remark-gfm";
import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: [
        "../__docs__/**/*.@(mdx|stories.@(ts|tsx))",
        "../__docs__/**/*.mdx",
    ],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
        "storybook-addon-pseudo-states",
        "@storybook/experimental-addon-test",
        {
            name: "@storybook/addon-docs",
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            },
        },
    ],
    staticDirs: ["../static"],
    core: {
        builder: "@storybook/builder-vite",
        disableTelemetry: true,
    },
    framework: "@storybook/react-vite",
    async viteFinal(config, options) {
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
