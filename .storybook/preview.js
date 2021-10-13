import React from "react";

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
};
