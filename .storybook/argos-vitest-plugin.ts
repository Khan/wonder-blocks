import {resolve} from "node:path";
import {
    argosVitestPlugin,
    createArgosScreenshotCommand,
    type ArgosScreenshotCommandArgs,
    type ArgosVitestPluginOptions,
} from "@argos-ci/storybook/vitest-plugin";
import type {Plugin} from "vitest/config";
import type {BrowserCommand} from "vitest/node";

/**
 * Where Argos writes screenshots before uploading them. Both the screenshot
 * command and the upload reporter have to use the same directory.
 */
const screenshotsRoot = resolve(process.cwd(), "./screenshots");

/**
 * Defaults applied to every story's Argos parameters.
 *
 * `fitToContent: false` captures the whole page (at the story's viewport)
 * instead of cropping to the rendered component and zooming it 2x, which is
 * closer to what Chromatic captures and keeps portaled content (popovers,
 * tooltips, modals) in frame.
 * See: https://argos-ci.com/docs/reference/storybook#fit-to-content-vs-page
 *
 * Stories can still override any of these via `parameters.argos`.
 */
const defaultArgosParameters = {
    fitToContent: false,
};

/**
 * The Argos parameters for a story.
 *
 * Mirrors how `@argos-ci/storybook` resolves its own parameters: `argos` wins
 * over `chromatic`, and `chromatic` is only used as a fallback. This keeps the
 * existing `chromatic` parameters (`modes`, `disableSnapshot`) working without
 * touching every story file.
 *
 * NOTE: This is also why the defaults above can't simply be set as
 * `parameters.argos` in `.storybook/preview.tsx`: as soon as a story has
 * *any* `argos` parameter, the plugin stops reading `chromatic`, and every
 * story would silently lose its `chromatic.modes` (themes, viewports, RTL).
 */
const getArgosParameters = (
    parameters: Record<string, any>,
): Record<string, any> => ({
    ...defaultArgosParameters,
    ...(parameters.argos ?? parameters.chromatic),
});

/**
 * Argos's Vitest plugin plus a wrapper that applies our default Argos
 * parameters and skips stories with `disableSnapshot: true`.
 *
 * `argosVitestPlugin` screenshots every story Vitest runs. It reads `modes`
 * and `fitToContent` from `parameters.argos` (falling back to
 * `parameters.chromatic`), but it has no equivalent of Chromatic's
 * `disableSnapshot`. Without this wrapper every docs/example story we've
 * opted out of would be captured (and billed).
 *
 * The plugin registers its screenshot logic as the `argosStorybookScreenshot`
 * browser command from its `config()` hook. Vite merges `config()` results in
 * plugin order, so a later plugin registering a command with the same name
 * replaces it. We delegate to Argos's own (exported) command for every story
 * that isn't opted out.
 */
export const argosPlugins = (options: ArgosVitestPluginOptions): Plugin[] => {
    const argosScreenshot = createArgosScreenshotCommand({
        ...options,
        root: screenshotsRoot,
    });

    const screenshotWithDefaults: BrowserCommand<
        ArgosScreenshotCommandArgs
    > = async (ctx, testContext) => {
        const argos = getArgosParameters(testContext.story.parameters);
        if (argos.disableSnapshot) {
            return [];
        }
        // Hand Argos the resolved parameters as `parameters.argos`, which it
        // reads before `chromatic`, so the defaults apply while the story's
        // modes are kept.
        return argosScreenshot(ctx, {
            ...testContext,
            story: {
                ...testContext.story,
                parameters: {...testContext.story.parameters, argos},
            },
        });
    };

    return [
        argosVitestPlugin({...options, root: screenshotsRoot}),
        {
            name: "wonder-blocks:argos-defaults",
            config: () => ({
                test: {
                    browser: {
                        commands: {
                            argosStorybookScreenshot: screenshotWithDefaults,
                        },
                    },
                },
            }),
        },
    ];
};
