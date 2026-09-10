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
 *   - declared inside `@layer shared`, so consumer legacy styles could
 *     defeat these rules from `@layer legacy`
 *
 * Delete once Phase 1 migrates the first real component to CSS Modules.
 */
export default {
    title: "Tools / CSS Modules Spike",
    component: Spike,
    parameters: {
        chromatic: {
            // NOTE: This will be switched back to true once we start migrating
            // real components.
            disableSnapshot: false,
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

/**
 * Proves the cross-package `--wb-action-inverse` mixin (WB-2327, Phase 3)
 * expands end-to-end: the control's interactive styling — including its
 * nested `:hover` / `:focus-visible` / `:active` rules and the reused
 * `--wb-focus-visible` ring — comes entirely from the mixin. Tab to the
 * button to see the focus ring on the dark backdrop.
 */
export const Inverse: Story = {
    args: {
        label: "Inverse spike button",
        inverse: true,
    },
};
