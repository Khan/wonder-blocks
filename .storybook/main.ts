import {resolve} from "path";
import {mergeConfig} from "vite";
import turbosnap from "vite-plugin-turbosnap";
import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../__docs__/**/*.stories.@(ts|tsx|mdx)"],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
        "@storybook/addon-designs",
        "@storybook/addon-interactions",
        "@storybook/addon-mdx-gfm",
        "@storybook/addon-mdx-gfm",
    ],
    staticDirs: ["../static"],
    core: {
        disableTelemetry: true,
    },
    framework: "@storybook/react-vite",
    async viteFinal(config, {configType}) {
        // Merge custom configuration into the default config
        const mergedConfig = mergeConfig(config, {
            resolve: {
                // Allow us to detect changes from local wonder-blocks packages.
                alias: [
                    {
                        find: /^@khanacademy\/wonder-blocks(-.*)$/,
                        replacement: resolve(
                            __dirname,
                            "../packages/wonder-blocks$1/src",
                        ),
                    },
                ],
            },
        });

        // Add turbosnap to production builds so we can let Chromatic take
        // snapshots only to stories associated with the current PR.
        if (configType === "PRODUCTION") {
            config.plugins?.push(
                turbosnap({rootDir: config.root || process.cwd()}),
            );
        }

        return mergedConfig;
    },
    docs: {
        autodocs: true,
    },
};

export default config;
