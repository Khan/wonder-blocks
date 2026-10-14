import {defineConfig, mergeConfig} from "vitest/config";
import {playwright} from "@vitest/browser-playwright";

import {storybookTest} from "@storybook/addon-vitest/vitest-plugin";
import viteConfig from "./vite.config";
import {argosPlugins} from "./.storybook/argos-vitest-plugin";

// Opt-in so local `pnpm test:storybook` runs stay a11y-only (and fast).
const argosEnabled = process.env.ARGOS_SCREENSHOTS === "true";

// Strip any trailing slash so the "Click to debug" link the Storybook Vitest
// addon builds as `${storybookUrl}/?path=...` doesn't end up with a double
// slash (the Chromatic-published URL we pass in CI ends with a slash).
const storybookUrl = (process.env.SB_URL || "http://localhost:6061").replace(
    /\/+$/,
    "",
);

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
                            storybookUrl,
                        }),
                        // Visual regression with Argos (spike, WB-2480). When
                        // enabled, every story is screenshotted after it
                        // renders (and after its a11y check), so the same
                        // Vitest run covers both a11y and VRT. Story modes
                        // (themes, viewports, RTL) come from the existing
                        // `chromatic.modes` parameters, so this is only turned
                        // on for one job of the CI theme matrix.
                        // Screenshots land in `./screenshots`, and are only
                        // uploaded when `ARGOS_UPLOAD=true` (auth comes from
                        // `ARGOS_TOKEN` or GitHub Actions OIDC).
                        // See: https://argos-ci.com/docs/reference/storybook
                        ...(argosEnabled
                            ? argosPlugins({
                                  uploadToArgos:
                                      process.env.ARGOS_UPLOAD === "true",
                              })
                            : []),
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
