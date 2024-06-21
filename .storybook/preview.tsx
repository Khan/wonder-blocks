import * as React from "react";
import wonderBlocksTheme from "./wonder-blocks-theme";

import {color} from "@khanacademy/wonder-blocks-tokens";
import Link from "@khanacademy/wonder-blocks-link";
import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {RenderStateRoot} from "../packages/wonder-blocks-core/src";
import {Preview} from "@storybook/react";

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

const parameters = {
    // Enable the RenderStateRoot decorator by default.
    enableRenderStateRootDecorator: true,
    backgrounds: {
        default: "light",
        values: [
            {
                name: "light",
                value: color.white,
            },
            {
                name: "darkBlue",
                value: color.darkBlue,
            },
            {
                name: "khanmigo",
                value: color.eggplant,
            },
            {
                name: "offWhite",
                value: color.offWhite,
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

export const decorators = [
    (Story, context) => {
        const theme = context.globals.theme;
        const enableRenderStateRootDecorator =
            context.parameters.enableRenderStateRootDecorator;

        if (enableRenderStateRootDecorator) {
            return (
                <RenderStateRoot>
                    <ThemeSwitcherContext.Provider value={theme}>
                        <Story />
                    </ThemeSwitcherContext.Provider>
                </RenderStateRoot>
            );
        }
        return (
            <ThemeSwitcherContext.Provider value={theme}>
                <Story />
            </ThemeSwitcherContext.Provider>
        );
    },
];

const preview: Preview = {
    parameters,
    globalTypes: {
        // Allow the user to select a theme from the toolbar.
        theme: {
            description: "Global theme for components",
            toolbar: {
                // The label to show for this toolbar item
                title: "Theme",
                icon: "switchalt",
                // Array of plain string values or MenuItem shape (see below)
                items: [
                    {
                        value: "default",
                        icon: "circlehollow",
                        title: "Wonder Blocks (default)",
                    },
                    {
                        value: "khanmigo",
                        icon: "circle",
                        title: "Khanmigo",
                    },
                ],
                // Change title based on selected value
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
