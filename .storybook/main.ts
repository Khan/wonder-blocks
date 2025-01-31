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
        "@storybook/addon-designs",
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
        disableTelemetry: true,
    },
    framework: "@storybook/react-vite",
};

export default config;
