import {beforeAll} from "vitest";
import {setProjectAnnotations} from "@storybook/react-vite";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";

import * as previewAnnotations from "./preview";

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([
    a11yAddonAnnotations,
    previewAnnotations,
    // Drive the theme from an env var so the a11y suite can be run once per
    // theme. Each run re-renders every story under the given theme so
    // axe's color-contrast and any theme-specific markup are audited correctly.
    // Defaults to "default" when unset, preserving the single-theme local run.
    {initialGlobals: {theme: import.meta.env.VITE_WB_THEME ?? undefined}},
]);

beforeAll(annotations.beforeAll);
