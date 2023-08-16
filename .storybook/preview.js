import React from "react";
import wonderBlocksTheme from "./wonder-blocks-theme";
import {configure} from "@storybook/testing-library";

import Link from "@khanacademy/wonder-blocks-link";

configure({
    testIdAttribute: "data-test-id",
});

/**
 * WB Official breakpoints
 * @see https://khanacademy.atlassian.net/wiki/spaces/WB/pages/2099970518/Layout+Breakpoints
 */
const wbViewports = {
    small: {
        name: "Small",
        styles: {
            width: "320px",
            height: "568px",
        },
    },
    medium: {
        name: "Medium",
        styles: {
            width: "768px",
            height: "1024px",
        },
    },
    large: {
        name: "Large",
        styles: {
            width: "1024px",
            height: "768px",
        },
    },
    chromebook: {
        name: "Chromebook",
        styles: {
            width: "1366px",
            height: "768px",
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
            includeNames: true,
            order: [
                "Overview",
                "*",
                ["Overview", "*"],
                "**/__docs__/**/*.mdx",
                "**/*.stories.@(js|jsx|ts|tsx)",
            ],
        },
    },
    docs: {
        toc: true,
        theme: wonderBlocksTheme,
        components: {
            // Override the default link component to use the WB Link component.
            a: Link,
        },
    },
    viewport: {
        viewports: wbViewports,
    },
};
