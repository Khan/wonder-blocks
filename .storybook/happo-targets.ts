/**
 * SPIKE: Happo visual regression testing (ADR #998).
 *
 * The Happo browser targets, one per viewport we snapshot. This file is
 * shared by `happo.config.ts` (Node) and `.storybook/happo.ts` (browser), so
 * it must not import anything.
 *
 * Happo renders a story in every target unless the story limits its
 * `targets`, and each target has a fixed viewport. Chromatic, on the other
 * hand, switches the viewport per story via `chromatic.modes`. To map one onto
 * the other we use one Chrome target per viewport, and `.storybook/happo.ts`
 * sends each story only to the targets its modes ask for.
 *
 * Every target's viewport must be unique: the browser code works out which
 * target it's running in from `window.innerWidth`/`innerHeight`, because
 * Happo doesn't expose the target name to the stories.
 */

/**
 * The target for stories without a viewport mode. 1200×900 matches
 * Chromatic's default viewport.
 */
export const DEFAULT_TARGET = "chrome";

type HappoTarget = {
    /** The viewport name used by `chromatic.modes` (see `.storybook/modes.ts`). */
    viewport: string | null;
    width: number;
    height: number;
};

export const happoTargets: Record<string, HappoTarget> = {
    [DEFAULT_TARGET]: {viewport: null, width: 1200, height: 900},
    // These mirror `wbViewports` in `.storybook/preview.tsx`.
    "chrome-small": {viewport: "small", width: 320, height: 568},
    "chrome-medium": {viewport: "medium", width: 768, height: 1024},
    "chrome-large": {viewport: "large", width: 1024, height: 768},
    "chrome-chromebook": {viewport: "chromebook", width: 1366, height: 768},
    "chrome-wide": {viewport: "wide", width: 1700, height: 900},
    // NOTE: `zoom400` is 320×256, but Happo's smallest viewport is 300×300,
    // so this target is 44px taller than the Chromatic mode. Snapshots are
    // full-height anyway; only `vh`-based and fixed-position content differs.
    "chrome-zoom400": {viewport: "zoom400", width: 320, height: 300},
};

/**
 * The Happo target for a Chromatic viewport name (`null` = the default).
 */
export const targetForViewport = (viewport: string | null): string | null =>
    Object.keys(happoTargets).find(
        (name) => happoTargets[name].viewport === viewport,
    ) ?? null;
