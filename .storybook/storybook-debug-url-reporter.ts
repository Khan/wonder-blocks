import {experimental_getRunnerTask} from "vitest/node";

import type {Reporter, TestCase} from "vitest/node";

/**
 * The theme the current `pnpm test:storybook` run is exercising. Driven by the
 * CI matrix so the a11y/snapshot suite runs once per theme (see
 * `.github/workflows/chromatic-pr.yml`). Unset for local single-theme runs.
 */
const theme = process.env.VITE_WB_THEME;

/**
 * Matches the story link that `@storybook/addon-vitest` injects into a failing
 * story's error message:
 *
 *     Click to debug the error directly in Storybook: <url>/?path=/story/<id>&addonPanel=<panel>
 *
 * The character class matches only the URL-safe characters that appear in the
 * link, so the match ends naturally at the ANSI reset escape that terminates
 * it. That lets the theme be appended to the link itself rather than after the
 * escape code.
 */
const storyLinkPattern = /(\?path=\/story\/[\w/&=:.%-]*)/;

/**
 * Pins the failing theme on the "Click to debug" Storybook link that
 * `@storybook/addon-vitest` adds to each failed-story error message.
 *
 * The addon hard-codes the link's query string and only exposes the URL prefix
 * (via `storybookUrl`), so the per-run theme can't be added there. This reporter
 * appends `&globals=theme:<theme>` to the link instead, so opening a CI failure
 * lands in the exact theme whose check failed rather than the default theme.
 */
export default class StorybookDebugUrlReporter implements Reporter {
    onTestCaseResult(testCase: TestCase) {
        // No theme override (e.g. local runs) means the link already points at
        // the theme under test, so there's nothing to pin.
        if (!theme) {
            return;
        }

        const errors = experimental_getRunnerTask(testCase).result?.errors;
        for (const error of errors ?? []) {
            if (
                typeof error.message === "string" &&
                storyLinkPattern.test(error.message) &&
                !error.message.includes("globals=theme:")
            ) {
                error.message = error.message.replace(
                    storyLinkPattern,
                    `$1&globals=theme:${theme}`,
                );
            }
        }
    }
}
