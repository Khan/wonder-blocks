/**
 * SPIKE: Happo visual regression testing (ADR #998).
 *
 * Maps the `parameters.chromatic` config our stories already have onto Happo,
 * so no story file needs a `parameters.happo`:
 *
 * - `chromatic.disableSnapshot: true` → `happo: false`.
 * - `chromatic.delay` → `happo.delay`.
 * - `chromatic.modes` → Happo targets (for viewports) and Happo "themes" (for
 *   the theme, direction and background globals). As in Chromatic, a story
 *   with modes is only captured in those modes, and a story without modes is
 *   captured once at 1200×900.
 *
 * Happo has no hook for changing a story's parameters, so we use Storybook's
 * `argTypesEnhancers`: they run while Storybook prepares each story, and get
 * the story's merged `parameters` object, which ends up in the prepared story
 * that Happo reads. The enhancer adds `parameters.happo` to it and returns the
 * argTypes untouched. It's only installed during Happo runs.
 *
 * Everything here only runs when `isHappoRun()` is true, i.e. in the
 * Storybook package that the `happo` CLI builds and uploads.
 */
import * as React from "react";
import type {Decorator, Preview} from "@storybook/react-vite";
import {DEFAULT_TARGET, happoTargets, targetForViewport} from "./happo-targets";

type Globals = {
    theme: string;
    direction: string;
    backgrounds: {value: string};
};

type ChromaticMode = {
    viewport?: unknown;
    theme?: string;
    direction?: string;
    // `allModes.dark` uses `background`; Chromatic itself uses `backgrounds`.
    background?: string;
    backgrounds?: {value?: string};
    disable?: boolean;
};

type Channel = {
    on: (event: string, listener: (...args: any[]) => void) => void;
    off: (event: string, listener: (...args: any[]) => void) => void;
    emit: (event: string, ...args: any[]) => void;
};

/**
 * The globals every snapshot starts from, also used as the Storybook
 * `initialGlobals` in Happo runs. Setting them explicitly (rather than leaving
 * `theme` undefined) means a snapshot looks the same whatever story Happo
 * rendered before it, which matters for partial runs.
 */
export const HAPPO_BASE_GLOBALS: Globals = {
    theme: "default",
    direction: "ltr",
    backgrounds: {value: "baseDefault"},
};

/**
 * Happo only passes the theme *name* to the theme switcher, so we keep the
 * globals for each mode name we've handed out. Mode names are global across
 * stories (they're the variant suffix in the Happo report, e.g.
 * `Sizes [themeSylDark]`), so the same name has to mean the same globals.
 */
const globalsByModeName = new Map<string, Globals>();

const globalsForMode = (mode: ChromaticMode): Globals => ({
    theme: mode.theme ?? HAPPO_BASE_GLOBALS.theme,
    direction: mode.direction ?? HAPPO_BASE_GLOBALS.direction,
    backgrounds: {
        value:
            mode.backgrounds?.value ??
            mode.background ??
            HAPPO_BASE_GLOBALS.backgrounds.value,
    },
});

const sameGlobals = (a: Globals, b: Globals) =>
    a.theme === b.theme &&
    a.direction === b.direction &&
    a.backgrounds.value === b.backgrounds.value;

const registerMode = (name: string, globals: Globals): void => {
    const existing = globalsByModeName.get(name);
    if (existing && !sameGlobals(existing, globals)) {
        // eslint-disable-next-line no-console
        console.error(
            `[happo] Mode "${name}" is used with different globals in ` +
                "different stories; snapshots may use the wrong ones.",
        );
    }
    globalsByModeName.set(name, globals);
};

/**
 * The Happo target this page is rendering for. Happo doesn't expose it to the
 * page, but every target has a unique viewport (see `happo-targets.ts`).
 */
const currentTarget = (): string => {
    const match = Object.keys(happoTargets).find(
        (name) =>
            happoTargets[name].width === window.innerWidth &&
            happoTargets[name].height === window.innerHeight,
    );
    if (!match) {
        // eslint-disable-next-line no-console
        console.warn(
            `[happo] No target has a ${window.innerWidth}×${window.innerHeight} viewport; assuming "${DEFAULT_TARGET}".`,
        );
    }
    return match ?? DEFAULT_TARGET;
};

/**
 * Resolves the `parameters.happo` value for a story in a given target.
 *
 * Exported for unit testing and for counting snapshots offline.
 */
export const happoParametersFor = (
    parameters: Record<string, any>,
    target: string,
): false | Record<string, unknown> => {
    // A story's own `happo` parameter wins.
    if (parameters.happo === false) {
        return false;
    }
    const own: Record<string, unknown> =
        typeof parameters.happo === "object" && parameters.happo !== null
            ? parameters.happo
            : {};

    const chromatic = parameters.chromatic ?? {};
    if (chromatic.disableSnapshot) {
        return false;
    }

    const modes = Object.entries<ChromaticMode>(chromatic.modes ?? {}).filter(
        ([, mode]) => mode && !mode.disable,
    );

    const base = {
        ...(chromatic.delay ? {delay: chromatic.delay} : {}),
        ...own,
    };

    // No modes: one snapshot, in the default target, with the base globals.
    if (modes.length === 0) {
        return target === DEFAULT_TARGET
            ? {
                  targets: [DEFAULT_TARGET],
                  beforeScreenshot: resetGlobals,
                  ...base,
              }
            : false;
    }

    // Only the modes that render in this target become Happo themes here.
    const themes: Array<string> = [];
    const targets = new Set<string>();
    for (const [name, mode] of modes) {
        const viewport =
            typeof mode.viewport === "string" ? mode.viewport : null;
        if (mode.viewport !== undefined && viewport === null) {
            // eslint-disable-next-line no-console
            console.warn(
                `[happo] Mode "${name}" has a non-named viewport; using the default target.`,
            );
        }
        const modeTarget = targetForViewport(viewport) ?? DEFAULT_TARGET;
        if (!targetForViewport(viewport)) {
            // eslint-disable-next-line no-console
            console.warn(
                `[happo] No target for viewport "${viewport}" (mode "${name}"); using "${DEFAULT_TARGET}".`,
            );
        }
        targets.add(modeTarget);
        if (modeTarget === target) {
            registerMode(name, globalsForMode(mode));
            themes.push(name);
        }
    }

    if (themes.length === 0) {
        return false;
    }
    return {targets: [...targets], themes, ...base};
};

const getChannel = (): Channel | undefined =>
    (globalThis as any).__STORYBOOK_ADDONS_CHANNEL__;

const getCurrentStoryId = (): string | undefined =>
    (globalThis as any).__STORYBOOK_PREVIEW__?.currentRender?.id;

/**
 * Waits for Storybook to finish (re)rendering `storyId`, the same way Happo
 * itself waits for a story: nested `loading` phases have to finish too.
 */
const waitForRender = (
    channel: Channel,
    storyId: string,
    timeoutMs = 5000,
): Promise<void> =>
    new Promise((resolve) => {
        let loadingCount = 0;
        let started = false;
        const done = () => {
            clearTimeout(timer);
            channel.off("storyRenderPhaseChanged", handlePhase);
            resolve();
        };
        const timer = setTimeout(done, timeoutMs);
        function handlePhase(ev: {newPhase: string; storyId: string}) {
            if (ev.storyId !== storyId) {
                return;
            }
            if (ev.newPhase === "loading") {
                started = true;
                loadingCount++;
            } else if (
                ev.newPhase === "finished" ||
                ev.newPhase === "aborted"
            ) {
                loadingCount--;
                if (
                    started &&
                    ev.newPhase === "finished" &&
                    loadingCount <= 0
                ) {
                    done();
                }
            }
        }
        channel.on("storyRenderPhaseChanged", handlePhase);
    });

/** The globals we last applied, to skip no-op switches. */
let appliedGlobals: Globals = HAPPO_BASE_GLOBALS;

/**
 * Applies `globals` and remounts the current story.
 *
 * Happo renders the story first and only then calls the theme switcher, while
 * Chromatic renders a mode with its globals from the start. A plain globals
 * update re-renders the story but doesn't re-run its `play` function, and our
 * theme decorator remounts the story tree (it's keyed by the theme), so
 * anything `play` opened would be lost. Remounting re-runs `play`.
 */
const applyGlobals = async (globals: Globals): Promise<void> => {
    const channel = getChannel();
    const storyId = getCurrentStoryId();
    if (!channel || !storyId || sameGlobals(appliedGlobals, globals)) {
        return;
    }
    appliedGlobals = globals;

    await new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, 2000);
        const handleUpdated = () => {
            clearTimeout(timer);
            channel.off("globalsUpdated", handleUpdated);
            resolve();
        };
        channel.on("globalsUpdated", handleUpdated);
        channel.emit("updateGlobals", {globals});
    });

    const rendered = waitForRender(channel, storyId);
    channel.emit("forceRemount", {storyId});
    await rendered;
};

/**
 * `beforeScreenshot` for stories without modes: undo whatever mode the
 * previous snapshot left behind.
 */
async function resetGlobals(): Promise<void> {
    await applyGlobals(HAPPO_BASE_GLOBALS);
}

/** Happo theme switcher: a Happo "theme" is a Chromatic mode name. */
export const happoThemeSwitcher = async (modeName: string): Promise<void> => {
    const globals = globalsByModeName.get(modeName);
    if (!globals) {
        // eslint-disable-next-line no-console
        console.error(`[happo] Unknown mode "${modeName}".`);
        return;
    }
    await applyGlobals(globals);
};

/**
 * Adds the resolved `parameters.happo` to every story as Storybook prepares
 * it. See the comment at the top of this file.
 */
export const happoArgTypesEnhancer: NonNullable<
    Preview["argTypesEnhancers"]
>[number] = (context) => {
    // Skip the component-level (`__meta`) preparation.
    if (context.name !== "__meta") {
        const happo = happoParametersFor(context.parameters, currentTarget());
        context.parameters.happo = happo;
    }
    return context.argTypes;
};

/**
 * Happo screenshots the rendered content, cropped to its size, while
 * Chromatic (and the Argos spike) capture the whole viewport and grow it to
 * fit taller content. This wrapper makes the content at least as tall as the
 * viewport (minus the `padded` layout's 1rem padding), so snapshots are
 * full-page at the target's viewport.
 */
export const withHappoFullPage: Decorator = (Story, {parameters}) => (
    <div
        style={{
            minHeight:
                parameters.layout === "fullscreen"
                    ? "100vh"
                    : "calc(100vh - 2rem)",
        }}
    >
        <Story />
    </div>
);
