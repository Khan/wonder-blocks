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
                        // Run story files serially in a single Chromium
                        // process to keep peak memory under the CI runner's
                        // limit. Browser mode spawns one Chromium process per
                        // worker; the ~170-file suite had grown large enough to
                        // OOM-kill the runner (exit 137) at the default worker
                        // count, and `maxWorkers: 2` was still borderline
                        // (passed once, then died ~150 files in). One worker
                        // minimizes concurrent browser memory, leaving headroom
                        // for the node coordinator; per-file isolation (the
                        // vitest default) keeps that single browser near
                        // steady-state. Trades wall-clock time for reliability.
                        maxWorkers: 1,
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
