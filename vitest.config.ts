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
                            provider: playwright({
                                launchOptions: {
                                    // In CI, use the pre-installed system Chrome
                                    // to avoid downloading Playwright's Chromium.
                                    // Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH in
                                    // the workflow to activate this.
                                    ...(process.env
                                        .PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH && {
                                        executablePath:
                                            process.env
                                                .PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
                                    }),
                                },
                            }),
                        },
                        setupFiles: ["./.storybook/vitest.setup.ts"],
                    },
                },
            ],
        },
    }),
);
