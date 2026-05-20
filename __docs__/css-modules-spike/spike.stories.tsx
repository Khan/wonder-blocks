import type {Meta, StoryObj} from "@storybook/react-vite";

import {Spike} from "./spike";

/**
 * CSS Modules tooling spike (WB-2324, Phase 0).
 *
 * These stories are throwaway — they exist to visually confirm that the
 * PostCSS + CSS Modules pipeline lights up in Storybook:
 *
 *   - `*.module.css` is loaded and class names are hashed
 *   - the component reads the locally-scoped `styles.root` / `styles.pill`
 *   - a cross-package `@import` from `@khanacademy/wonder-blocks-styles`
 *     resolves and the `wb-focus-visible` `@mixin` expands
 *   - declared inside `@layer shared`, so consumer overrides could defeat
 *     these rules from `@layer overrides`
 *
 * Delete once Phase 1 migrates the first real component to CSS Modules.
 */
export default {
    title: "Tools / CSS Modules Spike",
    component: Spike,
    parameters: {
        chromatic: {
            // Spike artifact, not a real component — no need to spend a
            // Chromatic snapshot on it.
            disableSnapshot: true,
        },
    },
} as Meta<typeof Spike>;

type Story = StoryObj<typeof Spike>;

export const Default: Story = {
    args: {
        label: "Spike button",
    },
};

export const WithBadge: Story = {
    args: {
        label: "Spike button",
        badge: "NEW",
    },
};
