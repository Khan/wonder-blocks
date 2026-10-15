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
 * Whether a story opted out of visual snapshots.
 *
 * Mirrors how `@argos-ci/storybook` resolves its own parameters: `argos` wins
 * over `chromatic`, and `chromatic` is only used as a fallback. This keeps the
 * existing `chromatic: {disableSnapshot: true}` stories working without
 * touching every story file.
 */
const isSnapshotDisabled = (parameters: Record<string, any>): boolean => {
    const params = parameters.argos ?? parameters.chromatic;
    return Boolean(params?.disableSnapshot);
};

/**
 * Argos's Vitest plugin plus a wrapper that skips stories with
 * `disableSnapshot: true`.
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

    const skipDisabledSnapshots: BrowserCommand<
        ArgosScreenshotCommandArgs
    > = async (ctx, testContext) => {
        if (isSnapshotDisabled(testContext.story.parameters)) {
            return [];
        }
        return argosScreenshot(ctx, testContext);
    };

    return [
        argosVitestPlugin({...options, root: screenshotsRoot}),
        {
            name: "wonder-blocks:argos-disable-snapshot",
            config: () => ({
                test: {
                    browser: {
                        commands: {
                            argosStorybookScreenshot: skipDisabledSnapshots,
                        },
                    },
                },
            }),
        },
    ];
};
