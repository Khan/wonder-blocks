import React from "react";
import wonderBlocksTheme from "./wonder-blocks-theme.js";

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
                value: "#0a2a66",
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
            order: ["Components", "**/__docs__/**"],
        },
    },
    docs: {
        theme: wonderBlocksTheme,
    },
};
