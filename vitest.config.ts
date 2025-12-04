import {defineConfig, mergeConfig} from "vitest/config";
import {playwright} from "@vitest/browser-playwright";

import {storybookTest} from "@storybook/addon-vitest/vitest-plugin";
import viteConfig from "./vite.config";

// More info at: https://storybook.js.org/docs/writing-tests/vitest-plugin
export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            projects: [
                {
                    extends: true,
                    plugins: [
                        // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
                        storybookTest({
                            configDir: ".storybook",
                            storybookUrl:
                                process.env.SB_URL || "http://localhost:6061",
                        }),
                    ],

                    test: {
                        name: "storybook",
                        browser: {
                            enabled: true,
                            instances: [{browser: "chromium"}],
                            headless: true,
                            provider: playwright({}),
                        },
                        setupFiles: [".storybook/vitest.setup.ts"],
                    },
                },
            ],
        },
    }),
);
