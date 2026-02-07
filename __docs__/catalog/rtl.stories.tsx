import {themeModes} from "../../.storybook/modes";
import * as catalogStories from "./catalog.stories";

export default {
    title: "Catalog / RTL",
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: themeModes,
        },
        a11y: {
            config: {
                rules: [
                    {
                        // Ignoring color contrast violations at this level, this
                        // is covered at the component level
                        id: "color-contrast",
                        enabled: false,
                    },
                    {
                        // Ignore unique landmark violation since structures are
                        // often reused to show variants / props combinations
                        id: "landmark-unique",
                        enabled: false,
                    },
                    {
                        // Ignore aria-valid-attr-value violations at this level,
                        // this is covered at the component level
                        id: "aria-valid-attr-value",
                        enabled: false,
                    },
                    {
                        // Ignore label violations at this level,
                        // this is covered at the component level
                        id: "label",
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export const TypographyAndIcons = {
    ...catalogStories.TypographyAndIcons,
    globals: {
        direction: "rtl",
    },
};

export const Buttons = {
    ...catalogStories.Buttons,
    globals: {
        direction: "rtl",
    },
};

export const Inputs = {
    ...catalogStories.Inputs,
    globals: {
        direction: "rtl",
    },
};

export const Feedback = {
    ...catalogStories.Feedback,
    globals: {
        direction: "rtl",
    },
};

export const NavigationAndMenus = {
    ...catalogStories.NavigationAndMenus,
    globals: {
        direction: "rtl",
    },
};

export const LayoutBlocks = {
    ...catalogStories.LayoutBlocks,
    globals: {
        direction: "rtl",
    },
};

export const Overlays = {
    ...catalogStories.Overlays,
    globals: {
        direction: "rtl",
    },
};

export const FloatingComponents = {
    ...catalogStories.FloatingComponents,
    globals: {
        direction: "rtl",
    },
};
