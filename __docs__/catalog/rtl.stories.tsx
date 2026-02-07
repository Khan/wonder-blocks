import {themeModes} from "../../.storybook/modes";
import * as catalogStories from "./catalog.stories";

export default {
    title: "Catalog / RTL",
    tags: ["!autodocs"],
    chromatic: {
        modes: themeModes,
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
