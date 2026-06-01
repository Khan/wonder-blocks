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
                        // Cap concurrency to keep peak memory under the CI
                        // runner's limit. Browser mode spawns one Chromium
                        // context per worker, and the suite had grown large
                        // enough to OOM-kill the runner (exit 137) at the
                        // default worker count (~CPU count). Bound it to a
                        // small fixed number; this trades a little wall-clock
                        // time for reliable memory headroom.
                        maxWorkers: 2,
                        browser: {
                            enabled: true,
                            instances: [{browser: "chromium"}],
                            headless: true,
                            provider: playwright({}),
                        },
                        setupFiles: ["./.storybook/vitest.setup.ts"],
                    },
                },
            ],
        },
    }),
);
