import {afterEach, beforeAll} from "vitest";
import {setProjectAnnotations} from "@storybook/react-vite";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";

import * as previewAnnotations from "./preview";

// The theme this run is exercising. The CI matrix runs the suite once per theme
// (see `.github/workflows/chromatic-pr.yml`); local runs leave it unset, which
// is equivalent to the "default" theme.
const theme = import.meta.env.VITE_WB_THEME;

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([
    a11yAddonAnnotations,
    previewAnnotations,
    // Drive the theme from an env var so the a11y suite can be run once per
    // theme. Each run re-renders every story under the given theme so
    // axe's color-contrast and any theme-specific markup are audited correctly.
    // Defaults to "default" when unset, preserving the single-theme local run.
    {initialGlobals: {theme: theme ?? undefined}},
]);

beforeAll(annotations.beforeAll);

/**
 * Matches the story link that `@storybook/addon-vitest` injects into a failing
 * story's error message:
 *
 *     Click to debug the error directly in Storybook: <url>/?path=/story/<id>&addonPanel=<panel>
 *
 * The character class only covers the URL-safe characters that appear in that
 * link, so the match ends at the ANSI reset escape that terminates it. That
 * lets the theme be appended to the link itself rather than after the escape
 * code (which would leave it outside the clickable URL).
 */
const storyLinkPattern = /(\?path=\/story\/[\w/&=:.%-]*)/;

/**
 * Pins the theme under test on the "Click to debug the error directly in
 * Storybook" link that `@storybook/addon-vitest` adds to each failed story.
 *
 * The addon hard-codes that link's query string and only lets us configure the
 * URL prefix (`storybookUrl` in `vitest.config.ts`), so the theme can't be
 * added there. Without it, Storybook falls back to whatever theme the toolbar
 * last persisted in the browser, and a failure from the `syl-dark` CI job can
 * open in the light theme — where it doesn't reproduce.
 *
 * This has to run after the addon's own `afterEach`, which is what adds the
 * link. It does, because Vitest's default `sequence.hooks: "stack"` runs
 * `afterEach` hooks in reverse registration order and the addon registers its
 * hook from a setup file that Vitest loads after this one. If the link ever
 * shows up without a theme, that ordering is the first thing to check.
 */
afterEach((context) => {
    for (const error of context.task.result?.errors ?? []) {
        if (
            typeof error.message === "string" &&
            storyLinkPattern.test(error.message) &&
            !error.message.includes("globals=theme:")
        ) {
            error.message = error.message.replace(
                storyLinkPattern,
                `$1&globals=theme:${theme ?? "default"}`,
            );
        }
    }
});
