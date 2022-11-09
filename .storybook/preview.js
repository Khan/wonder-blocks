import React from "react";
import wonderBlocksTheme from "./wonder-blocks-theme.js";

const wbViewports = {
    small: {
        name: "small",
        styles: {
            width: "320px",
            height: "568px",
        },
    },
    medium: {
        name: "medium",
        styles: {
            width: "768px",
            height: "1024px",
        },
    },
    large: {
        name: "large",
        styles: {
            width: "1024px",
            height: "935px",
        },
    },
};

export const parameters = {
    backgrounds: {
        default: "light",
        values: [
            {
                name: "light",
                value: "#ffffff",
            },
            {
                name: "darkBlue",
                value: "#0b2149",
            },
        ],
    },
    // https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
    options: {
        // Allowing stories to be sorted alphabetically. This means that we will
        // display the stories (or examples first), then we will display all the
        // mdx pages under __docs__.
        storySort: {
            order: ["Components", "**/__docs__/**", "Overview"],
        },
    },
    docs: {
        theme: wonderBlocksTheme,
    },
    viewport: {
        viewports: wbViewports,
    },
};
