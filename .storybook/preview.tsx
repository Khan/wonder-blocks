import * as React from "react";
import wonderBlocksTheme from "./wonder-blocks-theme";
import {Decorator} from "@storybook/react";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
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
};

/**
 * Wraps a story with `<div dir="rtl">` so it is shown in rtl mode.
 */
const withLanguageDirection: Decorator = (Story, context) => {
    if (context.globals.direction === "rtl") {
        return (
            <div dir="rtl">
                <Story />
            </div>
        )
    } else {
        return <Story />
    }
}

/**
 * Wraps a story with styling that simulates [zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom).
 *
 * Note: It is still important to test with real browser zoom in different
 * browsers. For example, using the CSS zoom property in Safari looks a bit
 * different than when you zoom in the browser.
 */
const withZoom: Decorator = (Story, context) => {
    if (context.globals.zoom) {
        return (
            <div style={{ zoom: context.globals.zoom }}>
                <Story />
            </div>
        )
    }
    return <Story />
}

const preview: Preview = {
    parameters,
    decorators: [withThemeSwitcher, withLanguageDirection, withZoom],
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
        direction: {
            description: "The language direction to use",
            toolbar: {
                title: "Language Direction",
                icon: "globe",
                items: [
                    {
                        value: "ltr",
                        icon: "arrowrightalt",
                        title: "Left to Right",
                    },
                    {
                        value: "rtl",
                        icon: "arrowleftalt",
                        title: "Right to Left",
                    },
                ],
                dynamicTitle: true,
            },
        },
        zoom: {
            description: "Preset zoom level",
            toolbar: {
                title: "Zoom Presets",
                icon: "zoom",
                items: [
                    {
                        // undefined so the there is no zoom value set
                        value: undefined,
                        title: "default",
                    },
                    {
                        value: "2",
                        title: "200%",
                    },
                    {
                        value: "4",
                        title: "400%",
                    },
                ],
            },
        }
    },

    tags: ["autodocs"],
};

export default preview;
