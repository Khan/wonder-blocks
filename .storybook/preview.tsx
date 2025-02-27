import * as React from "react";
import wonderBlocksTheme from "./wonder-blocks-theme";
import {Decorator} from "@storybook/react";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import Link from "@khanacademy/wonder-blocks-link";
import {
    ThemeSwitcherContext,
    ThemeSwitcher,
} from "@khanacademy/wonder-blocks-theming";
import {RenderStateRoot} from "../packages/wonder-blocks-core/src";
import {Preview} from "@storybook/react";

// Import the Wonder Blocks CSS variables
// NOTE: External consumers should import the CSS variables from the
// wonder-blocks-tokens package directly.
// e.g. import "@khanacademy/wonder-blocks-tokens/styles.css";
import "../node_modules/@khanacademy/wonder-blocks-tokens/dist/css/index.css";

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
                value: semanticColor.surface.primary,
            },
            {
                name: "darkBlue",
                value: semanticColor.surface.inverse,
            },
            {
                name: "khanmigo",
                value: semanticColor.khanmigo.primary,
            },
            {
                name: "offWhite",
                value: semanticColor.surface.secondary,
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
        toc: {
            // Useful for MDX pages like "Using color".
            headingSelector: "h2, h3",
            // Prevents including generic headings like "Stories" and "Usage".
            ignoreSelector:
                ".docs-story h2, .docs-story h3, .sbdocs #stories, .sbdocs #usage, .sbdocs-subtitle",
        },
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

const withThemeSwitcher: Decorator = (
    Story,
    {globals: {theme}, parameters: {enableRenderStateRootDecorator}},
) => {
    if (enableRenderStateRootDecorator) {
        return (
            <RenderStateRoot>
                <ThemeSwitcherContext.Provider value={theme}>
                    <ThemeSwitcher theme={theme}>
                        <Story />
                    </ThemeSwitcher>
                </ThemeSwitcherContext.Provider>
            </RenderStateRoot>
        );
    }
    return (
        <ThemeSwitcherContext.Provider value={theme}>
            <ThemeSwitcher theme={theme}>
                <Story />
            </ThemeSwitcher>
        </ThemeSwitcherContext.Provider>
    );
};

const preview: Preview = {
    parameters,
    decorators: [withThemeSwitcher],
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
                        icon: "comment",
                        title: "Khanmigo",
                    },
                    {
                        value: "classroom",
                        icon: "lightning",
                        title: "Classroom",
                    },
                ],
                // Change title based on selected value
                dynamicTitle: true,
            },
        },
    },

    tags: ["autodocs"],
};

export default preview;
